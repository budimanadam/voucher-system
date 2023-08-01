const config = require('../config');
const db = require('mysql-promise')();

db.configure({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

// create random Users
it ('create users', async () => {
    for (let index = 0; index < 5; index++) {
        let userType = 'customer';
        let r = (Math.random() + 1).toString(36).substring(7);
        await db.query(`INSERT INTO user (user_code, type) values (?, ?)`, [r.toUpperCase(), userType]);
    }
});

// create random Vouchers
it ('create vouchers', async () => {
    for (let index = 0; index < 1000; index++) {
        let r = (Math.random() + 1).toString(36).substring(7);
        await db.query(`INSERT IGNORE INTO voucher (voucher_code) values (?)`, [r]);
    }
});

// create random Transactions or Purchases
it ('create transactions or puchases', async () => {
    for (let index = 0; index < 5; index++) {
        const user_id = 9;
        await db.query(`INSERT INTO purchase (user_id, price, status) values (?, ?, ?)`, [user_id, 10000, 'COMPLETED']);
    }
});