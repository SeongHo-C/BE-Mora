const { Board } = require('./model');

exports.getBoards = async (category) => {
  try {
    const data = await Board.findAll({ where: { category } });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getBoard = async (id) => {
  try {
    const data = await Board.findOne({ where: { id } });
    return data;
  } catch (error) {
    throw new Error(err);
  }
};
