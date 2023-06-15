const {
  Alert,
  User,
  Comment,
  Board,
  Plan,
  UserDetail,
} = require('../../models');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

module.exports = {
  async addAlert(alertInfo) {
    const { type, target_id } = alertInfo;

    let alert = await Alert.create(alertInfo);
    if (!alert) {
      throw new InternalServerErrorException(
        `${id} 알림 등록 처리에 실패하였습니다.`
      );
    }

    if (type === 'COMMENT') {
      alert = await Alert.findOne({
        include: [
          {
            model: User,
            as: 'AlertFromUser',
            attributes: ['name', 'email'],
            include: [
              {
                model: Comment,
                attributes: ['content'],
                where: { board_id: target_id },
              },
            ],
          },
          {
            model: User,
            as: 'AlertToUser',
            attributes: ['name', 'email'],
            include: [
              {
                model: Board,
                attributes: ['title', 'content'],
              },
            ],
          },
        ],
        where: {
          id: alert.id,
        },
      });
    } else if (type === 'PLAN') {
      alert = await Alert.findOne({
        include: [
          {
            model: User,
            as: 'AlertFromUser',
            attributes: ['name', 'email'],
          },
          {
            model: User,
            as: 'AlertToUser',
            attributes: ['name', 'email'],
          },
          {
            model: Plan,
            attributes: ['title', 'content', 'start_date'],
          },
        ],
        where: {
          id: alert.id,
        },
      });
    }

    return alert;
  },

  async setAlert(id, toUser, checked) {
    const alert = await Alert.findOne({
      where: { id, to_user_id: toUser },
      raw: true,
    });
    if (!alert) {
      throw new NotFoundException(
        '존재하지 않는 알림이거나 알림 당사자가 아닌 사용자의 요청입니다.'
      );
    }

    if (alert.checked === 0 && checked === true) {
      const updateCount = await Alert.update(
        {
          checked,
        },
        { where: { id } }
      );
      if (!updateCount) {
        throw new InternalServerErrorException(
          `${id} 알림 확인 여부 수정 처리에 실패하였습니다.`
        );
      }
    } else {
      throw new BadRequestException(
        '이미 읽은 알림은 다시 수정할 수 없습니다.'
      );
    }

    return await Alert.findOne({
      include: [
        {
          model: User,
          as: 'AlertFromUser',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      where: {
        id: alert.id,
      },
    });
  },

  async getAlerts(id) {
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const fiveDaysAgo = dayjs()
      .subtract(5, 'day')
      .format('YYYY-MM-DD HH:mm:ss');

    // 로그인 한 유저의 최근 5일 이내 알림에 있는 댓글 정보 조회
    const alertComments = await Alert.findAll({
      attributes: [
        'id',
        'type',
        'target_id',
        'checked',
        'createdAt',
        'from_user_id',
        'to_user_id',
      ],
      raw: true,
      subQuery: true,
      include: [
        {
          model: User,
          as: 'AlertFromUser',
          attributes: ['name', 'email'],
          include: [
            {
              model: UserDetail,
              attributes: ['img_path'],
            },
          ],
        },
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
        type: 'COMMENT',
        to_user_id: id,
      },
      order: [['created_at', 'DESC']],
    });

    // 최근 5일 이내의 댓글 정보 조회
    const comment = await Comment.findAll({
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
      },
      include: [
        {
          model: Board,
          attributes: ['title', 'content'],
        },
      ],
      raw: true,
      order: [['created_at', 'DESC']],
    });

    let boardId = [];
    let boardTitle = [];
    let boardContent = [];
    let commentId = [];
    let commentContent = [];
    comment.forEach((c) => {
      boardId.push(c.board_id);
      boardTitle.push(c['Board.title']);
      boardContent.push(c['Board.content']);
      commentId.push(c.id);
      commentContent.push(c.content);
    });

    // 알림에 있는 target_id가 댓글의 id와 같으면 입력 처리
    for (let i = 0; i < alertComments.length; i++) {
      if (alertComments[i].target_id === commentId[i]) {
        alertComments[i].boardId = boardId[i];
        alertComments[i].boardTitle = boardTitle[i];
        alertComments[i].boardContent = boardContent[i];
        alertComments[i].commentId = commentId[i];
        alertComments[i].commentContent = commentContent[i];
      }
    }

    // 로그인 한 유저의 최근 5일 이내 알림에 있는 plan정보 조회
    const alertPlans = await Alert.findAll({
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
        type: 'PLAN',
        to_user_id: id,
      },
      raw: true,
      include: [
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    // 최근 5일 이내의 일정 정보 조회
    let plan = await Plan.findAll({
      attributes: ['id', 'title', 'content', 'start_date'],
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
      },
      raw: true,
      order: [['start_date', 'DESC']],
    });

    let planId = [];
    let planTitle = [];
    let planContent = [];
    let planStartDate = [];
    plan.forEach((p) => {
      planId.push(p.id);
      planTitle.push(p.title);
      planContent.push(p.content);
      planStartDate.push(p.start_date);
    });

    // 알림에 있는 target_id가 일정의 id와 같으면 입력 처리
    for (let i = 0; i < planId.length; i++) {
      for (let j = 0; j < alertPlans.length; j++) {
        if (alertPlans[j].target_id === planId[i]) {
          alertPlans[j].planTitle = planTitle[i];
          alertPlans[j].planContent = planContent[i];
          alertPlans[j].planStartDate = planStartDate[i];
        }
      }
    }

    const alerts = [...alertComments, ...alertPlans];
    alerts.sort((a, b) => b.createdAt - a.createdAt);

    return alerts;
  },
};
