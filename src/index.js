const config = require('./config');
const fastify = require('fastify')({ logger: { level: config.LOG_LEVEL } });
const getHome = require('./handler/home');
const getUserCode = require('./handler/user-code');
const uploadPhoto = require('./handler/upload-photo');
fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/multipart'))
const db = require('mysql-promise')();

db.configure({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE
});

fastify.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
});

fastify.route({
    method: 'GET',
    url: '/',
    handler: getHome
});

fastify.route({
    method: 'POST',
    url: '/user-code',
    handler: getUserCode
});

fastify.route({
    method: 'POST',
    url: '/upload-photo',
    handler: uploadPhoto
});

const start = async () => {
    try {
        await fastify.listen(config.PORT, '0.0.0.0');
        console.log(`Server listening on port ${config.PORT}`);
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start();
  