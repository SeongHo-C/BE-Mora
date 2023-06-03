const User = require('./model');
const bcrypt = require('bcrypt');

/**
 * 회원가입
 * @param {이름, 이메일, 비밀번호}
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
    // CREATE 중 에러 발생 시
    throw new Error('사용자 등록 중에 오류가 발생하였습니다.');
  }
};
