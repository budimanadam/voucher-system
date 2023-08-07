async function checkAvailableVouchers(req) {

  const [availableVouchers] = await req.db.execute(`select * from voucher where user_id is NULL`);
    return availableVouchers;
  }

module.exports = checkAvailableVouchers;