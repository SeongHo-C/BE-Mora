const {
  User,
  UserDetail,
  Board,
  Photo,
  Comment,
  Like,
  Hashtag,
} = require('../../models');
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
      boards.map((board) => Comment.count({ where: { board_id: board.id } }))
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

    return boards.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
        hashtags: hashtags_title[idx],
      };

      return Object.assign({}, board.dataValues, additionalData);
    });
  },

  async getBoard(id) {
    const board = await Board.findOne({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      where: { id },
    });

    await board.update({
      view_cnt: board.view_cnt + 1,
    });

    const user_detail = await UserDetail.findOne({
      where: { user_id: board.writer },
      attributes: ['img_path', 'generation_id', 'position'],
    });

    const comment_cnt = await Comment.count({ where: { board_id: id } });
    const like_cnt = await Like.count({ where: { board_id: id } });

    const hashtags = await db.sequelize.models.board_hashtag.findAll({
      attributes: ['hashtag_id'],
      where: { board_id: id },
    });
    const hashtags_title = await Promise.all(
      hashtags.map((hashtag) =>
        Hashtag.findOne({
          attributes: ['title'],
          where: { id: hashtag.dataValues.hashtag_id },
        })
      )
    );

    const additionalData = {
      user_detail,
      comment_cnt,
      like_cnt,
      hashtags: hashtags_title,
    };

    return Object.assign({}, board.dataValues, additionalData);
  },

  async getComments(id) {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      where: { board_id: id },
    });

    const user_detail = await Promise.all(
      comments.map(({ commenter }) =>
        UserDetail.findOne({
          where: { user_id: commenter },
          attributes: ['img_path', 'generation_id', 'position'],
        })
      )
    );

    return comments.map((comment, idx) =>
      Object.assign({}, comment.dataValues, { user_detail: user_detail[idx] })
    );
  },
};
