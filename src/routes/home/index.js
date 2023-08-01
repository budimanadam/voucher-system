'use strict'
const getHome = require('../../handler/home');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: getHome
    });
}