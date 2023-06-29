const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require('./error-format');
const logger = require('../logger');

function refreshAccessToken(req, res) {
  const accessToken = req.headers['authorization']?.split(' ')[1] ?? 'null';
  const refreshToken = req.headers.refresh;
  if (!refreshToken) {
    logger.error('리프레시 토큰이 없습니다.');
    throw new UnauthorizedException('리프레시 토큰이 필요합니다.');
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decodedAccessToken = jwt.verify(accessToken, secretKey);
    const decoded = jwt.verify(refreshToken, secretKey);

    // 액세스 토큰을 갱신하기 위해 유효한지 확인
    if (decoded) {
      const userId = decodedAccessToken.id;
      const role = decodedAccessToken.role;
      const profile_public = decodedAccessToken.profile_public;
      const img_path = decodedAccessToken.img_path;

      // 새로운 액세스 토큰을 생성합니다.
      const newAccessToken = jwt.sign(
        {
          id: userId,
          role: role,
          profile_public: profile_public,
          img_path: img_path,
        },
        secretKey,
        {
          expiresIn: '1h',
        }
      );

      // 응답 본문에 새로운 액세스 토큰과 리프레시 토큰을 설정합니다.
      res.json({
        accessToken: newAccessToken,
        refreshToken: refreshToken,
      });
    } else {
      logger.error('유효하지 않은 액세스 토큰입니다.');
      throw new UnauthorizedException('유효하지 않은 액세스 토큰입니다.');
    }
  } catch (error) {
    logger.error('유효하지 않은 토큰입니다.');
    throw new UnauthorizedException('유효하지 않은 토큰입니다.');
  }
}

module.exports = refreshAccessToken;
