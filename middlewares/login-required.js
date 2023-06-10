const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require('./error-format');
const logger = require('../logger');

function loginRequired(req, res, next) {
  const userToken = req.headers['authorization']?.split(' ')[1] ?? 'null';

  if (!userToken || userToken === 'null') {
    logger.error(
      '서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음'
    );
    throw new UnauthorizedException(
      '로그인한 유저만 사용할 수 있는 서비스입니다.'
    );
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const { id } = jwtDecoded;
    req.currentId = id;

    next();
  } catch (error) {
    logger.error('정상적이지 않은 토큰입니다.');
    throw new UnauthorizedException('정상적인 토큰이 아닙니다.');
  }
}

module.exports = loginRequired;
