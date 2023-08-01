'use strict'
const getUserCode = require('../../handler/user-code');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/user-code',
        handler: getUserCode
    });
}