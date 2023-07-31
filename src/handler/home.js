const checkAvailableVouchers = require('../utils/helper');

const getHome = async (req, rep) => {
    const availableVouchers = checkAvailableVouchers();
    return rep.view("/templates/index.ejs", { availableVouchers });
}

module.exports = getHome;