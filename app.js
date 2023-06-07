const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler, NotFoundClass } = require('./middlewares');
const adminRouter = require('./api/admin/router');
const noticeRouter = require('./api/notice/router');
const boardRouter = require('./api/board/router');
const userRouter = require('./api/user/router');
const commentRouter = require('./api/comment/router');
const generationRouter = require('./api/generation/router');
const reportRouter = require('./api/report/router');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output');

dotenv.config();
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/api', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data);
});

app.use('/api', adminRouter);
app.use('/api', noticeRouter);
app.use('/api/v1/board', boardRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api', generationRouter);
app.use('/api', reportRouter);

app.use((req, res, next) => {
  const error = new NotFoundClass(
    `${req.method} ${req.url} 라우터가 없습니다.`
  );
  next(error);
});

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
