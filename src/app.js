'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const db = require('mysql-promise')();
const config = require('./config');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {

db.configure({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE
});

  // This loads and sets @fastify/swagger
  fastify.register(require('@fastify/swagger'), {})
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs'
  })

  fastify.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
  });

  fastify.register(require('@fastify/formbody'))
  fastify.register(require('@fastify/multipart'))

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.addHook('onRequest', (request, reply, done) => {
    request.db = db;
    done();
  })

  // This loads and sets fastify/cors
  fastify.register(require('@fastify/cors'), {
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
  })

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
}
