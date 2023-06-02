const { getBoards } = require('./service');

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
