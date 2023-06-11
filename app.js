const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler, NotFoundException } = require('./middlewares');
const adminRouter = require('./api/admin/router');
const noticeRouter = require('./api/notice/router');
const boardRouter = require('./api/board/router');
const userRouter = require('./api/user/router');
const userDetailRouter = require('./api/user-detail/router');
const commentRouter = require('./api/comment/router');
const generationRouter = require('./api/generation/router');
const reportRouter = require('./api/report/router');
const quizRouter = require('./api/quiz/router');
const skillRouter = require('./api/skill/router');
const likeRouter = require('./api/like/router');
const planRouter = require('./api/plan/router');
const careerRouter = require('./api/career/router');
const adminBoardRouter = require('./api/admin-board/router');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const logger = require('./logger');

dotenv.config();
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    logger.info('데이터베이스 연결 성공');
  })
  .catch((err) => {
    logger.error(err);
  });

app.use(
  cors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
    optionsSuccessStatus: 200,
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/', (req, res) => {
  res.status(204).end();
});

app.use('/api', adminRouter);
app.use('/api', noticeRouter);
app.use('/api', boardRouter);
app.use('/api', userRouter);
app.use('/api', userDetailRouter);
app.use('/api', quizRouter);
app.use('/api', skillRouter);
app.use('/api', commentRouter);
app.use('/api', generationRouter);
app.use('/api', reportRouter);
app.use('/api', likeRouter);
app.use('/api', planRouter);
app.use('/api', careerRouter);
app.use('/api', adminBoardRouter);

app.use((req, res, next) => {
  const error = new NotFoundException(
    `${req.method} ${req.url} 라우터가 없습니다.`
  );
  logger.error(error.message);
  next(error);
});

app.use(errorHandler);

app.listen(app.get('port'), () => {
  logger.info(app.get('port'), '번 포트에서 대기중');
});
