const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const Admin = require('./api/admin/model');
const Plan = require('./api/plan/model');
const Notice = require('./api/notice/model');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Admin = Admin;
db.Plan = Plan;
db.Notice = Notice;

Admin.initiate(sequelize);
Plan.initiate(sequelize);
Notice.initiate(sequelize);

Admin.associate(db);
Plan.associate(db);
Notice.associate(db);

module.exports = db;
