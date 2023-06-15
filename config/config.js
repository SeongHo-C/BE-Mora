require('dotenv').config();

module.exports = {
  development: {
    username: process.env.D_USER_NAME,
    password: process.env.D_USER_PASSWD,
    database: process.env.D_DB_NAME,
    host: process.env.D_DB_HOST,
    dialect: 'mysql',
    timezone: 'Asia/Seoul',
  },
  production: {
    username: process.env.P_USER_NAME,
    password: process.env.P_USER_PASSWD,
    database: process.env.P_DB_NAME,
    host: process.env.P_DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: 'Asia/Seoul',
  },
};
