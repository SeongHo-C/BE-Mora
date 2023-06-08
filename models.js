const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const Board = require('./api/board/model');
const Hashtag = require('./api/hashtag/model');

const Quiz = require('./api/quiz/model');
const { Skill, UserSkill } = require('./api/skill/model');

const Admin = require('./api/admin/model');
const User = require('./api/user/model');
const UserDetail = require('./api/user-detail/model');
const Plan = require('./api/plan/model');
const Notice = require('./api/notice/model');
const Photo = require('./api/photo/model');
const Comment = require('./api/comment/model');
const Generation = require('./api/generation/model');
const Report = require('./api/report/model');

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
db.UserDetail = UserDetail;
db.Quiz = Quiz;
db.Skill = Skill;
db.UserSkill = UserSkill;
db.Plan = Plan;
db.Notice = Notice;
db.Board = Board;
db.Hashtag = Hashtag;
db.Photo = Photo;
db.Comment = Comment;
db.Generation = Generation;
db.Report = Report;

Board.initiate(sequelize);
Hashtag.initiate(sequelize);
Admin.initiate(sequelize);
User.initiate(sequelize);
UserDetail.initiate(sequelize);
Quiz.initiate(sequelize);
Skill.initiate(sequelize);
UserSkill.initiate(sequelize);
Plan.initiate(sequelize);
Notice.initiate(sequelize);
Photo.initiate(sequelize);
Comment.initiate(sequelize);
Generation.initiate(sequelize);
Report.initiate(sequelize);

Board.associate(db);
Hashtag.associate(db);
Admin.associate(db);
UserDetail.associate(db);
UserSkill.associate(db);
Plan.associate(db);
Notice.associate(db);
Photo.associate(db);
Comment.associate(db);
Generation.associate(db);
Report.associate(db);

module.exports = db;
