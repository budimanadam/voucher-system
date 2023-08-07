const config = require('../config');

// get the client
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');


function connect() {
    return mysql.createConnection({host:config.HOST, user: config.USER, database: config.DATABASE, Promise: bluebird});
}

module.exports = connect;