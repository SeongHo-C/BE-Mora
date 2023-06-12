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
            img_path: img.img_path,
            origin_name: img.origin_name,
          });
        })
      );
    }

    return board.id;
  },

  async deleteBoard(id, loginId) {
    const board = await Board.findOne({
      attributes: ['writer'],
      where: { id },
    });

    if (board.writer !== loginId) {
      throw new UnauthorizedException(
        '게시판 작성자와 동일한 사용자만 삭제가 가능합니다.'
      );
    }

    await Board.destroy({
      where: { id },
    });
  },

  async updateBoard(category, title, content, hashtags, images, id, loginId) {
    const board = await Board.findOne({
      where: { id },
    });

    if (board.writer !== loginId) {
      throw new UnauthorizedException(
        '게시판 작성자와 동일한 사용자만 수정이 가능합니다.'
      );
    }

    await Board.update(
      {
        category,
        writer: loginId,
        title,
        content,
      },
      {
        where: { id },
      }
    );

    if (hashtags.length >= 0) {
      const result = await Promise.all(
        hashtags.map((hashtag) => {
          return Hashtag.findOrCreate({
            where: { title: hashtag.toLowerCase() },
          });
        })
      );
      await board.setHashtags(result.map((r) => r[0]));
    }

    await Photo.destroy({
      where: { board_id: id },
    });

    if (images.length >= 0) {
      await Promise.all(
        images.map((image) => {
          return Photo.create({
            board_id: id,
            img_path: image.img_path,
            origin_name: image.origin_name,
          });
        })
      );
    }
  },

  async getBoards(category) {
    const boards = await Board.findAll({
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
        {
          model: Photo,
          attributes: ['img_path', 'origin_name'],
        },
      ],
      where: { id },
    });

    await board.update({
      view_cnt: board.view_cnt + 1,
    });

    const user_detail = await UserDetail.findOne({
      where: { user_id: board.writer },
      attributes: ['img_path', 'generation', 'position'],
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
      hashtags: hashtags_title.map((tag) => tag.dataValues.title),
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
          attributes: ['img_path', 'generation', 'position'],
        })
      )
    );

    return comments.map((comment, idx) =>
      Object.assign({}, comment.dataValues, { user_detail: user_detail[idx] })
    );
  },

  async getPopularBoard() {
    let boards = await Board.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      order: [['view_cnt', 'DESC']],
      limit: 10,
    });

    const comment_cnt = await Promise.all(
      boards.map((board) => Comment.count({ where: { board_id: board.id } }))
    );
    const like_cnt = await Promise.all(
      boards.map((board) => Like.count({ where: { board_id: board.id } }))
    );

    const userDetails = await Promise.all(
      boards.map((board) =>
        UserDetail.findOne({
          where: { user_id: board.writer },
          attributes: ['img_path', 'generation', 'position'],
        })
      )
    );

    boards = boards.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
        user_detail: userDetails[idx],
      };

      return Object.assign({}, board.dataValues, additionalData);
    });

    return boards.sort((first, second) => {
      const firstSum = first.view_cnt + first.like_cnt;
      const secondSum = second.view_cnt + second.like_cnt;

      return firstSum === secondSum
        ? second.view_cnt - first.view_cnt
        : secondSum - firstSum;
    });
  },
};
