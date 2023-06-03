const { Board } = require('./model');
const { Hashtag } = require('../hashtag/model');

exports.setBoard = async (id, category, title, content, hashtags, imgUrls) => {
  try {
    const board = await Board.create({
      category,
      writer: id,
      title,
      content,
    });

    if (hashtags.length > 0) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.toLowerCase() },
          });
        })
      );
      await board.addHashtags(result.map((r) => r[0]));
    }
  } catch (error) {
    throw new Error(err);
  }
};

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
