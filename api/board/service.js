const { Board } = require('./model');

exports.getBoards = async (category) => {
  try {
    const data = await Board.findAll({ where: { category } });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
