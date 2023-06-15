require('dotenv').config();

module.exports = {
  development: {
    username: process.env.D_USER_NAME,
    password: process.env.D_USER_PASSWD,
    database: process.env.D_DB_NAME,
    host: process.env.D_DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
    dialectOptions: {
      timezone: '+09:00',
    },
  },
  production: {
    username: process.env.P_USER_NAME,
    password: process.env.P_USER_PASSWD,
    database: process.env.P_DB_NAME,
    host: process.env.P_DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '+09:00',
    dialectOptions: {
      timezone: '+09:00',
    },
  },
};
