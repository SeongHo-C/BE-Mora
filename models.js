const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const Board = require('./api/board/model');
const Hashtag = require('./api/hashtag/model');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Board = Board;
db.Hashtag = Hashtag;

Board.initiate(sequelize);
Hashtag.initiate(sequelize);

Board.associate(db);
Hashtag.associate(db);

module.exports = db;
