require('dotenv').config();
const env = process.env;

module.exports = {
  development: {
    username: env.USER_NAME,
    password: env.USER_PASSWD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: env.USER_NAME,
    password: env.USER_PASSWD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: env.USER_NAME,
    password: env.USER_PASSWD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mysql',
  },
};
