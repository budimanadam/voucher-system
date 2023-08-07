const connect = require('../utils/mysql-helper');


// create random Users
xit ('create users', async () => {
    const db = await connect();

    for (let index = 0; index < 5; index++) {
        let userType = 'customer';
        let r = (Math.random() + 1).toString(36).substring(7);
        await db.execute(`INSERT INTO user (user_code, type) values (?, ?)`, [r.toUpperCase(), userType]);
    }
});

// create random Vouchers
xit ('create vouchers', async () => {
    const db = await connect();
    for (let index = 0; index < 1000; index++) {
        let r = (Math.random() + 1).toString(36).substring(7);
        await db.execute(`INSERT IGNORE INTO voucher (voucher_code) values (?)`, [r]);
    }
});

// create random Transactions or Purchases
it ('create transactions or puchases', async () => {
    const db = await connect();
    for (let index = 0; index < 10; index++) {
        const user_id = 40;
        await db.execute(`INSERT INTO purchase (user_id, price, status) values (?, ?, ?)`, [user_id, 10000, 'COMPLETED']);
    }
});
