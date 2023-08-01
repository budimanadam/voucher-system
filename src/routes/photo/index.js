'use strict'
const uploadPhoto = require('../../handler/upload-photo');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/upload-photo',
        handler: uploadPhoto
    });
}