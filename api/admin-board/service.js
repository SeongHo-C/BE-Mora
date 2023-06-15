const {
  User,
  Board,
  Photo,
  Comment,
  Like,
  Hashtag,
  UserDetail,
} = require('../../models');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const {
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async getBoards(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let boards = await Board.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${keyword}%` } },
              { email: { [Op.like]: `%${keyword}%` } },
            ],
          },
        },
        {
          model: Photo,
          attributes: ['img_path'],
        },
      ],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
          { '$User.name$': { [Op.like]: `%${keyword}%` } },
          { '$User.email$': { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    boards = getPagingData(boards, page, limit);

    return boards;
  },

  async getDetail(id) {
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
          model: Comment,
          attributes: ['id', 'content', 'created_at', 'commenter'],
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
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
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    const comment_cnt = await Comment.count({ where: { board_id: id } });
    const like_cnt = await Like.count({ where: { board_id: id } });

    const user_like = await Like.findOne({
      where: {
        board_id: id,
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

  async deleteBoard(id) {
    const board = await Board.findOne({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
        {
          model: Photo,
          attributes: ['img_path'],
        },
        {
          model: Comment,
          attributes: ['content'],
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
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
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }
    const likeCnt = await Like.count({ where: { board_id: id } });

    const deleteCount = await board.destroy({});
    if (!deleteCount) {
      throw new InternalServerErrorException(
        '게시글 삭제 처리에 실패하였습니다.'
      );
    }

    return { board, likeCnt };
  },

  async deleteComment(id) {
    const comment = await Comment.findOne({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('존재하지 않는 댓글입니다.');
    }

    const deleteCount = await Comment.destroy({ where: { id } });
    if (!deleteCount) {
      throw new InternalServerErrorException(
        '댓글 삭제 처리에 실패하였습니다.'
      );
    }

    return comment;
  },
};
