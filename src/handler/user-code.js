const checkAvailableVouchers = require('../utils/helper');

const getUserCode = async (req, rep) => {
    const [user] = await req.db.execute(`select * from user where user_code = ?`, [req.body.user_code]);
      if (user.length === 0) {
        return rep.view("/templates/index.ejs", {error: true, messages: 'user not exist', availableVouchers: checkAvailableVouchers(req)});;
      }
      const [purchases] = await req.db.execute(`select * from purchase where user_id = ? and DATE(created_date) >= DATE(NOW()) - INTERVAL 30 DAY and status = 'COMPLETED' order by created_date ASC`, [user[0].user_id]);
      if (purchases.length === 0)  {
        return rep.view("/templates/index.ejs", {error: true, messages: 'user not eligible', availableVouchers: checkAvailableVouchers(req)});;
      }
      let totalTrx = 0;
      purchases.forEach(purc => {
        totalTrx += purc.price;
      });
      
      if (totalTrx < 100) {
        return rep.view("/templates/index.ejs", {error: true, messages: 'user not eligible', availableVouchers: checkAvailableVouchers(req)});;
      }
      return rep.view("/templates/upload_photo.ejs", {voucher: null, user_code: req.body.user_code});
}

module.exports = getUserCode;