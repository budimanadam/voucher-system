const db = require('mysql-promise')();
const config = require('../config');
const checkAvailableVouchers = require('../utils/helper');

db.configure({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

const getUserCode = async (req, rep) => {
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
      return rep.view("/templates/upload_photo.ejs", {voucher: null, user_code: req.body.user_code});
}

module.exports = getUserCode;