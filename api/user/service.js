const User = require('./model');
const UserDetail = require('../user-detail/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('../../middlewares');

module.exports = {
  /**
   * 회원가입
   * @param {name, email, password}
   */
  async addUser(userInfo) {
    const { name, email, password } = userInfo;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return;
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 회원가입
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //회원 정보 테이블 초기 값 설정
    await UserDetail.create({
      user_id: newUser.id,
      position: '직책을 입력해주세요.',
      generation: '트랙 및 기수를 입력해주세요.',
      profile_public: false,
      img_path:
        'https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/default.png',
    });

    if (!newUser) {
      throw new BadRequestException('회원가입에 실패했습니다.');
    }

    return newUser;
  },

  /**
   * 사용자 로그인
   */
  async getUserToken({ email, password }) {
    // 사용자 조회

    const user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: UserDetail,
          attributes: ['img_path', 'profile_public'],
        },
      ],
    });
    if (!user) {
      return;
    }

    // 패스워드 검증
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jwt.sign(
      {
        id: user.id,
        role: 'user',
        profile_public: user.UserDetail.profile_public,
        img_path: user.UserDetail.img_path,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );
    const refreshToken = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  },

  /**
   * 회원탈퇴
   */
  async deleteUser(loginId, password) {
    const user = await User.findOne({ where: { id: loginId } });
    if (!user) {
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return;
    }

    const result = await User.destroy({ where: { id: loginId } });
    return result;
  },
};
