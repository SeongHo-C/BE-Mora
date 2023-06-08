const { Board, Photo, Comment, Like, Hashtag } = require('../../models');
const { UnauthorizedException } = require('../../middlewares');
// const { Sequelize, fn, col } = require('sequelize');

module.exports = {
  async setBoard(writer, category, title, content, hashtags, images) {
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
  },

  async deleteBoard(board_id, login_id) {
    const board = await Board.findOne({
      attributes: ['writer'],
      where: { id: board_id },
    });

    if (board.writer !== login_id) {
      throw new UnauthorizedException(
        '게시판 작성자와 동일한 사용자만 삭제가 가능합니다.'
      );
    }

    await Board.destroy({
      where: { id: board_id },
    });
  },

  async updateBoard(
    category,
    title,
    content,
    hashtags,
    images,
    board_id,
    login_id
  ) {
    const board = await Board.findOne({
      where: { id: board_id },
    });

    if (board.writer !== login_id) {
      throw new UnauthorizedException(
        '게시판 작성자와 동일한 사용자만 수정이 가능합니다.'
      );
    }

    await Board.update(
      {
        category,
        writer: login_id,
        title,
        content,
      },
      {
        where: { id: board_id },
      }
    );

    if (hashtags.length > 0) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.toLowerCase() },
          });
        })
      );
      await board.setHashtags(result.map((r) => r[0]));
    }

    await Photo.destroy({
      where: { board_id },
    });

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
  },

  async getBoards(category) {
    const board = await Board.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
        { model: Like, attributes: ['id'] },
        { model: Hashtag, attributes: ['title'] },
      ],
      where: { category },
    });

    return board;
  },
};
