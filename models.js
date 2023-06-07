const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const Board = require('./api/board/model');
const Hashtag = require('./api/hashtag/model');

const Admin = require('./api/admin/model');
const User = require('./api/user/model');
const Plan = require('./api/plan/model');
const Notice = require('./api/notice/model');
const Photo = require('./api/photo/model');
const Comment = require('./api/comment/model');
const Generation = require('./api/generation/model');
const Report = require('./api/report/model');
const Like = require('./api/like/model');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Admin = Admin;
db.User = User;
db.Plan = Plan;
db.Notice = Notice;
db.Board = Board;
db.Hashtag = Hashtag;
db.Photo = Photo;
db.Comment = Comment;
db.Generation = Generation;
db.Report = Report;
db.Like = Like;

Board.initiate(sequelize);
Hashtag.initiate(sequelize);
Admin.initiate(sequelize);
User.initiate(sequelize);
Plan.initiate(sequelize);
Notice.initiate(sequelize);
Photo.initiate(sequelize);
Comment.initiate(sequelize);
Generation.initiate(sequelize);
Report.initiate(sequelize);
Like.initiate(sequelize);

Board.associate(db);
Hashtag.associate(db);
Admin.associate(db);
Plan.associate(db);
Notice.associate(db);
Photo.associate(db);
Comment.associate(db);
Generation.associate(db);
Report.associate(db);
Like.associate(db);

module.exports = db;
