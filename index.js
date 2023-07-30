const config = require('./config');


const fastify = require('fastify')({ logger: { level: config.LOG_LEVEL } });
const fs = require('fs');
const util = require('util');
const { pipeline } = require('stream');

fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/multipart'))
const db = require('mysql-promise')();
const pump = util.promisify(pipeline)


db.configure({
	host: "localhost",
    user: "root",
    password: "",
    database: "simple_crud"
});

fastify.get('/', async (request, reply) => {
    const availableVouchers = checkAvailableVouchers();
    return reply.view("/templates/index.ejs", { availableVouchers });
});

fastify.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
});

async function checkAvailableVouchers() {
  const availableVouchers = await db.query(`select * from voucher where user_id is NULL`).spread(function (res) {
    return res;
  });
  return availableVouchers;
}

fastify.post('/user-code', async (req, rep) => {
  const user = await db.query(`select * from user where user_code = ?`, [req.body.user_code]).spread(function (res) {
    return res[0];
  });
  if (!user) {
    return rep.view("/templates/index.ejs", {error: true, messages: 'user not exist', availableVouchers: checkAvailableVouchers()});;
  }
  const purchases = await db.query(`select * from purchase where user_id = ? and DATE(created_date) >= DATE(NOW()) - INTERVAL 30 DAY and status = 'COMPLETED' order by created_date ASC`, [user.user_id]).spread(function (res) {return res});
  if (purchases.length === 0)  {
    return rep.view("/templates/index.ejs", {error: true, messages: 'user not eligible', availableVouchers: checkAvailableVouchers()});;
  }
  let totalTrx = 0;
  purchases.forEach(purc => {
    totalTrx += purc.price;
  });
  
  if (totalTrx < 100) {
    return rep.view("/templates/index.ejs", {error: true, messages: 'user not eligible', availableVouchers: checkAvailableVouchers()});;
  }
  console.log('success');
  return rep.view("/templates/upload_photo.ejs", {voucher: null, user_code: req.body.user_code});
});

fastify.post('/upload-photo', async (req, rep) => {
  const user = await db.query(`select * from user where user_code = ?`, [req.query.user_code]).spread(function (res) {return res[0]});
  const userVoucher = await db.query(`select * from voucher where user_id = ?`, [user.user_id]).spread(function (res) {return res[0]});
  console.log('userVoucher');
  console.log(userVoucher);
  if (userVoucher) {
    console.log('WWW');
    return rep.view("/templates/upload_photo.ejs", {voucher: userVoucher, user_code: req.query.user_code});
  }
  const parts = req.parts();
  for await (const part of parts) {
    if (part.file) {
      await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));
    }
  }
  const voucher = await db.query(`select * from voucher where user_id is null  order by voucher_id DESC limit 1`).spread(function (res) {return res[0]});
  if (voucher && voucher.length !== 0) {
    console.log('QQQ');
    await db.query(`update voucher set user_id = ? where voucher_id = ?`, [user.user_id, voucher.voucher_id]);
    await db.query(`insert into voucher_activity (voucher_id, user_id) values (?, ?)`, [voucher.voucher_id, user.user_id]);
  }
  return rep.view("/templates/upload_photo.ejs", {voucher: voucher, user_code: req.query.user_code});
});

const start = async () => {
    try {
        await fastify.listen(config.PORT, '0.0.0.0');
        console.log(`Server listening on port ${config.PORT}`);
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start();
  