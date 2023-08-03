const util = require('util');
const { pipeline } = require('stream');
const pump = util.promisify(pipeline);
const fs = require('fs');


const uploadPhoto = async (req, rep) => {
    const user = await req.db.query(`select * from user where user_code = ?`, [req.query.user_code]).spread(function (res) {return res[0]});
    const userVoucher = await req.db.query(`select * from voucher where user_id = ?`, [user.user_id]).spread(function (res) {return res[0]});
    if (userVoucher) {
        return rep.view("/templates/upload_photo.ejs", {voucher: userVoucher, user_code: req.query.user_code});
    }
    const parts = req.parts();
    for await (const part of parts) {
        if (part.file) {
        await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));
        }
    }
    const voucher = await req.db.query(`select * from voucher where user_id is null  order by voucher_id DESC limit 1`).spread(function (res) {return res[0]});
    if (voucher && voucher.length !== 0) {
        await req.db.query(`update voucher set user_id = ? where voucher_id = ?`, [user.user_id, voucher.voucher_id]);
        await req.db.query(`insert into voucher_activity (voucher_id, user_id) values (?, ?)`, [voucher.voucher_id, user.user_id]);
    }
    return rep.view("/templates/upload_photo.ejs", {voucher: voucher, user_code: req.query.user_code});
}

module.exports = uploadPhoto;