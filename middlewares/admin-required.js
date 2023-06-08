const jwt = require('jsonwebtoken');
const { UnauthorizedClass, ForbiddenClass } = require('./error-format');
const logger = require('../logger');

function loginRequired(req, res, next) {
  const userToken = req.headers['authorization']?.split(' ')[1] ?? 'null';

  if (!userToken || userToken === 'null') {
    logger.error(
      '서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음'
    );
    throw new UnauthorizedClass('로그인한 유저만 사용할 수 있는 서비스입니다.');
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  const jwtDecoded = jwt.verify(userToken, secretKey);
  if (!jwtDecoded || jwtDecoded === 'null') {
    throw new UnauthorizedClass('정상적인 토큰이 아닙니다.');
  }

  const { id, role } = jwtDecoded;
  if (role !== 'admin') {
    throw new ForbiddenClass('관리자만 사용할 수 있는 서비스입니다.');
  }

  req.currentId = id;

  next();
}

module.exports = loginRequired;
