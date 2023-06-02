const { getBoards, getBoard } = require('./service');

exports.getBoards = async (req, res, next) => {
  const { cateogory } = req.params;

  try {
    const data = await getBoards(cateogory);
    return res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getBoard = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await getBoard(id);
    return res.json(data);
  } catch (error) {
    console.error(err);
    next(err);
  }
};
