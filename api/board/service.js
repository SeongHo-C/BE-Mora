const {
  User,
  UserDetail,
  Board,
  Photo,
  Comment,
  Like,
  Hashtag,
} = require('../../models');
const { Op } = require('sequelize');
const { ForbiddenException } = require('../../middlewares');
const { getPagination, getPagingData } = require('../../utils');

module.exports = {
  async setBoard(category, title, content, hashtags, images, writer) {
    const board = await Board.create({
      category,
      title,
      content,
      writer,
    });

    if (hashtags.length > 0) {
      const result = await Promise.all(
        hashtags.map((hashtag) =>
          Hashtag.findOrCreate({
            where: { title: hashtag.toLowerCase() },
          })
        )
      );

      result.forEach(([hashtag, created]) => {
        if (!created) hashtag.increment('usage_cnt', { by: 1 });
      });

      await board.addHashtags(result.map((r) => r[0]));
    }

    if (images.length > 0) {
      await Promise.all(
        images.map((img_path) =>
          Photo.create({
            board_id: board.id,
            img_path,
          })
        )
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
      throw new ForbiddenException(
        '게시판 작성자와 동일한 사용자만 삭제가 가능합니다.'
      );
    }

    await Board.destroy({
      where: { id },
    });

    return '게시글 삭제 완료';
  },

  async updateBoard(category, title, content, hashtags, images, id, loginId) {
    const board = await Board.findOne({
      where: { id },
    });

    if (board.writer !== loginId) {
      throw new ForbiddenException(
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

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((hashtag) =>
          Hashtag.findOrCreate({
            where: { title: hashtag.toLowerCase() },
          })
        )
      );
      await board.setHashtags(result.map((r) => r[0]));
    }

    await Photo.destroy({
      where: { board_id: id },
    });

    if (images) {
      await Promise.all(
        images.map((img_path) =>
          Photo.create({
            board_id: id,
            img_path,
          })
        )
      );
    }

    return id;
  },

  async getBoards(category, keyword, page, size, sort) {
    const { limit, offset } = getPagination(page, size);

    let order = [['createdAt', 'DESC']];

    if (sort === 'view') {
      order = [['view_cnt', 'DESC']];
    }

    let boards = await Board.findAndCountAll({
      include: [
        {
          model: Hashtag,
          attributes: ['title'],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        category,
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
        ],
      },
      order,
      offset,
      limit,
      distinct: true,
    });

    boards = getPagingData(boards, page, limit);

    const comment_cnt = await Promise.all(
      boards.objArr.map((board) =>
        Comment.count({ where: { board_id: board.id } })
      )
    );
    const like_cnt = await Promise.all(
      boards.objArr.map((board) =>
        Like.count({ where: { board_id: board.id } })
      )
    );

    const items = boards.objArr.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
        Hashtags: board.Hashtags.map((hashtag) => hashtag.title),
      };

      return { ...board.dataValues, ...additionalData };
    });

    return { ...boards, objArr: [...items] };
  },

  async getBoard(id, loginId) {
    const board = await Board.findOne({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          include: [
            {
              model: UserDetail,
              attributes: ['img_path', 'generation', 'position'],
            },
          ],
        },
        {
          model: Photo,
          attributes: ['img_path'],
        },
        {
          model: Hashtag,
          attributes: ['title'],
          through: {
            attributes: [],
          },
        },
      ],
      where: { id },
    });

    await board.update({
      view_cnt: board.view_cnt + 1,
    });

    const comment_cnt = await Comment.count({ where: { board_id: id } });
    const like_cnt = await Like.count({ where: { board_id: id } });

    const user_like = await Like.findOne({
      where: {
        board_id: id,
        user_id: loginId,
      },
    });

    const additionalData = {
      comment_cnt,
      like_cnt,
      Hashtags: board.Hashtags.map((hashtag) => hashtag.dataValues.title),
      User: {
        name: board.User.name,
        email: board.User.email,
        ...board.User.UserDetail.dataValues,
      },
      user_like: !!user_like,
    };

    return { ...board.dataValues, ...additionalData };
  },

  async getComments(id) {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          include: [
            {
              model: UserDetail,
              attributes: ['img_path', 'generation', 'position'],
            },
          ],
        },
      ],
      where: { board_id: id },
      order: [['createdAt', 'DESC']],
    });

    return comments.map((comment) => ({
      ...comment.dataValues,
      User: {
        name: comment.User.name,
        email: comment.User.email,
        ...comment.User.UserDetail.dataValues,
      },
    }));
  },

  async getPopularBoard() {
    let boards = await Board.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          include: [
            {
              model: UserDetail,
              attributes: ['img_path', 'generation', 'position'],
            },
          ],
        },
        {
          model: Photo,
          attributes: ['img_path'],
          limit: 1,
        },
        {
          model: Hashtag,
          attributes: ['title'],
          through: {
            attributes: [],
          },
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

    boards = boards.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
        Hashtags: board.Hashtags.map((hashtag) => hashtag.title),
        User: {
          name: board.User.name,
          email: board.User.email,
          ...board.User.UserDetail.dataValues,
        },
        Photos: board.Photos.length > 0 ? board.Photos[0].img_path : '',
      };

      return { ...board.dataValues, ...additionalData };
    });

    return boards.sort((first, second) => {
      const firstSum = first.view_cnt + first.like_cnt;
      const secondSum = second.view_cnt + second.like_cnt;

      return firstSum === secondSum
        ? second.view_cnt - first.view_cnt
        : secondSum - firstSum;
    });
  },

  async getRecommendBoard(category) {
    let boards = await Board.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          include: [
            {
              model: UserDetail,
              attributes: ['img_path', 'generation', 'position'],
            },
          ],
        },
      ],
      where: {
        category,
      },
      order: [['view_cnt', 'DESC']],
      limit: 2,
    });

    const comment_cnt = await Promise.all(
      boards.map((board) => Comment.count({ where: { board_id: board.id } }))
    );
    const like_cnt = await Promise.all(
      boards.map((board) => Like.count({ where: { board_id: board.id } }))
    );

    boards = boards.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
        User: {
          name: board.User.name,
          email: board.User.email,
          ...board.User.UserDetail.dataValues,
        },
      };

      return { ...board.dataValues, ...additionalData };
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
