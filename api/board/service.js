const { Board, Photo, Comment, Like, Hashtag } = require('../../models');
const db = require('../../models');
const { UnauthorizedException } = require('../../middlewares');

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

    return board.id;
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
    let boards = await Board.findAll({
      where: { category },
    });

    const comment_cnt = await Promise.all(
      boards.map((board) => Comment.count({ where: { id: board.id } }))
    );

    const like_cnt = await Promise.all(
      boards.map((board) => Like.count({ where: { board_id: board.id } }))
    );

    const hashtags = await Promise.all(
      boards.map((board) =>
        db.sequelize.models.board_hashtag.findAll({
          attributes: ['hashtag_id'],
          where: { board_id: board.id },
        })
      )
    );

    const hashtags_title = await Promise.all(
      hashtags.map((hashtag) =>
        Promise.all(
          hashtag.map((tag) =>
            Hashtag.findOne({
              attributes: ['title'],
              where: { id: tag.dataValues.hashtag_id },
            })
          )
        )
      )
    );

    boards = boards.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
        hashtags: hashtags_title[idx],
      };

      return Object.assign({}, board.dataValues, additionalData);
    });

    return boards;
  },
};
