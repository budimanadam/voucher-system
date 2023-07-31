require('dotenv').config();

const config = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT
};

module.exports = config;
