const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middlewares');
const adminRouter = require('./api/admin/router');
const noticeRouter = require('./api/notice/router');
const boardRouter = require('./api/board/router');
const userRouter = require('./api/user/router');

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

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/notice', noticeRouter);
app.use('/api/v1/board', boardRouter);
app.use('/api/v1/user', userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  next();
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

app.use(errorHandler);
