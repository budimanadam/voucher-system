const db = require('mysql-promise')();

db.configure({
	host: "localhost",
    user: "root",
    password: "",
    database: "simple_crud"
});

xit ('create vouchers', async () => {
    for (let index = 0; index < 100; index++) {
        let r = (Math.random() + 1).toString(36).substring(7);
        await db.query(`INSERT INTO voucher (voucher_code) values (?)`, [r]);
        console.log('success');
    }
});

xit ('create users', async () => {
    for (let index = 0; index < 5; index++) {
        let r = (Math.random() + 1).toString(36).substring(7);
        await db.query(`INSERT INTO user (user_code, type) values (?, 'client')`, [r.toUpperCase()]);
        console.log('success');
    }
});

it ('create transactions or puchases', async () => {
    for (let index = 0; index < 5; index++) {
        const user_id = 4;
        await db.query(`INSERT INTO purchase (user_id, price, status) values (?, ?, ?)`, [user_id, 10000, 'COMPLETED']);
        console.log('success');
    }
});