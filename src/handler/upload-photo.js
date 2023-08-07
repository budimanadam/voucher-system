const util = require('util');
const { pipeline } = require('stream');
const pump = util.promisify(pipeline);
const fs = require('fs');


const uploadPhoto = async (req, rep) => {
    const [user] = await req.db.execute(`select * from user where user_code = ?`, [req.query.user_code]);
    const [userVoucher] = await req.db.execute(`select * from voucher where user_id = ?`, [user[0].user_id]);
    if (userVoucher.length !== 0) {
        return rep.view("/templates/upload_photo.ejs", {voucher: userVoucher[0], user_code: req.query.user_code});
    }
    const parts = req.parts();
    for await (const part of parts) {
        if (part.file) {
        await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));
        }
    }
    const [voucher] = await req.db.query(`select * from voucher where user_id is null  order by voucher_id DESC limit 1`);
    if (voucher && voucher.length !== 0) {
        await req.db.execute(`update voucher set user_id = ? where voucher_id = ?`, [user[0].user_id, voucher[0].voucher_id]);
        await req.db.execute(`insert into voucher_activity (voucher_id, user_id) values (?, ?)`, [voucher[0].voucher_id, user[0].user_id]);
    }
    return rep.view("/templates/upload_photo.ejs", {voucher: voucher[0], user_code: req.query.user_code});
}

module.exports = uploadPhoto;