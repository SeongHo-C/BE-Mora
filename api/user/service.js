const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * 회원가입
 * @param {name, email, password}
 */
exports.addUser = async (userInfo) => {
  const { name, email, password } = userInfo;

  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    throw new Error('이미 가입된 회원입니다.');
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return newUser;
  } catch (e) {
    throw new Error('사용자 등록 중에 오류가 발생하였습니다.');
  }
};

/**
 * 로그인
 * @param { email, password}
 */
exports.getUserToken = async (loginUserInfo) => {
  const { email, password } = loginUserInfo;

  // 사용자 조회
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error('아이디 또는 비밀번호를 다시 입력해주세요.');
  }

  // 패스워드 검증
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('아이디 또는 비밀번호를 다시 입력해주세요.');
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: '1h',
    });
    return token;
  } catch (e) {
    throw new Error(e);
  }
};
