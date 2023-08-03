const config = require('../config');
const db = require('mysql-promise')();

db.configure({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

async function checkAvailableVouchers(req) {
    const availableVouchers = await req.db.query(`select * from voucher where user_id is NULL`).spread(function (res) {
      return res;
    });
    return availableVouchers;
  }

module.exports = checkAvailableVouchers;