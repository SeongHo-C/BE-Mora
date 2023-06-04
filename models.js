const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const Board = require('./api/board/model');
const Hashtag = require('./api/hashtag/model');

const Admin = require('./api/admin/model');
const Plan = require('./api/plan/model');
const Notice = require('./api/notice/model');
const Generation = require('./api/generation/model');

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
db.Board = Board;
db.Hashtag = Hashtag;
db.Generation = Generation;

Board.initiate(sequelize);
Hashtag.initiate(sequelize);
Admin.initiate(sequelize);
Plan.initiate(sequelize);
Notice.initiate(sequelize);
Generation.initiate(sequelize);

Board.associate(db);
Hashtag.associate(db);
Admin.associate(db);
Plan.associate(db);
Notice.associate(db);
Generation.associate(db);

module.exports = db;
