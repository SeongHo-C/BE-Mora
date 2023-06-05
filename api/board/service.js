const { Board, Hashtag, Photo } = require('../../models');

exports.setBoard = async (
  writer,
  category,
  title,
  content,
  hashtags,
  images
) => {
  try {
    const board = await Board.create({
      category,
      writer,
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

    if (images.length > 0) {
      await Promise.all(
        images.map((img) => {
          return Photo.create({
            board_id: board.id,
            path: img.path,
            origin_name: img.origin_name,
          });
        })
      );
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteBoard = async (board_id, login_id) => {
  try {
    const board = await Board.findOne({
      attributes: ['writer'],
      where: { id: board_id },
    });

    if (board.writer !== login_id) {
      throw new Error('게시판 작성자와 동일한 사용자만 삭제가 가능합니다.');
    }

    await Board.destroy({
      where: { id: board_id },
    });
  } catch (err) {
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
  } catch (err) {
    throw new Error(err);
  }
};
