const express = require('express');
const router = express.Router();
const alertController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');
const mailer = require('../../utils/send-mail');

router.post(
  '/alerts',
  loginRequired,
  serviceHandler(alertController.addAlert)
  //  #swagger.description = '알림 등록'
  //  #swagger.tags = ['alerts']
  /*  #swagger.responses[201] = {
            description: '알림 등록 성공',
            schema: {
                data: {
                  id: '0dabae0a-7c6a-4992-9efa-decb996d40aa', 
                  type: 'COMMENT',
                  target_id: '0946ba84-9536-4b4c-98cf-7e6b38cc01f8',
                  checked: 0,
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z',
                  from_user_id: '28080e5c-b328-4599-a56f-a4eb7ca68a1a',
                  to_user_id: '194f71b1-1cc7-40ee-87d9-5e563fc1dca9',
                  AlertFromUser: {
                    name: '홍길동',
                    email: 'test@gmail.com'
                  },
                  AlertToUser: {
                    name: '김성수',
                    email: 'elice@gmail.com'
                  }
                }
            }
  } */
  /*  #swagger.responses[500] = {
            description: '알림 등록 처리에 실패한 경우',
            schema: {
                message: '{ID} 알림 등록 처리에 실패하였습니다.'
            }
  } */
);

router.post(
  '/alerts/mail',
  (req, res) => {
    const { emails, subject, text } = req.body;
    emails.forEach((emails) => {
      mailer.sendGmail(emails.email, subject, text);
    });

    res.status(200).send('이메일이 성공적으로 발송되었습니다.');
  }
  //  #swagger.description = '이메일 발송'
  //  #swagger.tags = ['alerts']
  /*  #swagger.parameters[''] = {
                in: 'body',
                schema: {
                    subject: '이메일 제목',
                    text: '이메일 내용',
                    emails: [
                      { email: 'test1@gmail.com' },
                      { email: 'test2@gmail.com' },
                      { email: 'test3@gmail.com' }
                    ]
                }
  } */
  /*  #swagger.responses[200] = {
            description: '이메일이 성공적으로 발송되었습니다.'
  } */
);

router.patch(
  '/alerts/:id',
  loginRequired,
  serviceHandler(alertController.setAlert)
  //  #swagger.description = '알림 읽음 여부 수정'
  //  #swagger.tags = ['alerts']
  /*  #swagger.responses[200] = {
            description: '알림 읽음 여부 수정 성공',
            schema: {
                data: {
                  id: '0dabae0a-7c6a-4992-9efa-decb996d40aa', 
                  type: 'COMMENT',
                  target_id: '0946ba84-9536-4b4c-98cf-7e6b38cc01f8',
                  checked: 1,
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z',
                  from_user_id: '28080e5c-b328-4599-a56f-a4eb7ca68a1a',
                  to_user_id: '194f71b1-1cc7-40ee-87d9-5e563fc1dca9',
                  AlertFromUser: {
                    name: '홍길동',
                    email: 'test@gmail.com'
                  },
                  AlertToUser: {
                    name: '김성수',
                    email: 'elice@gmail.com'
                  }
                }
            }
  } */
  /*  #swagger.responses[400] = {
            description: '이미 수정된 알림을 다시 수정하거나 잘못된 수정 데이터가 들어온 경우',
            schema: {
                message: '이미 읽은 알림은 다시 수정할 수 없습니다.'
            }
  } */
  /*  #swagger.responses[404] = {
            description: '알림 ID가 존재하지 않거나 당사자의 알림 수정 요청이 아닌 경우',
            schema: {
                message: '존재하지 않는 알림이거나 알림 당사자가 아닌 사용자의 요청입니다.'
            }
  } */
  /*  #swagger.responses[500] = {
            description: '알림 수정 처리에 실패한 경우',
            schema: {
                message: '{ID} 알림 수정 처리에 실패하였습니다.'
            }
  } */
);

router.get(
  '/alerts',
  loginRequired,
  serviceHandler(alertController.getAlerts)
  //  #swagger.description = '조회 시점 5일 전까지의 전체 알림 정보 조회'
  //  #swagger.tags = ['alerts']
  /*  #swagger.responses[200] = {
            description: '조회 시점 5일 전까지의 전체 알림 정보 조회 성공',
            schema: {
                data: {
                  comments: [
                      {
                        id: '0dabae0a-7c6a-4992-9efa-decb996d40aa', 
                        type: 'COMMENT',
                        target_id: '4a2dfd95-4a31-4e54-a66e-e24aefd5ccaf',
                        checked: 0,
                        createdAt: '2023-06-03T16:19:06.000Z',
                        updatedAt: '2023-06-03T16:19:06.000Z',
                        from_user_id: '28080e5c-b328-4599-a56f-a4eb7ca68a1a',
                        to_user_id: '3c4bee5f-e35f-4de0-90d7-2dd8ad3d132f',
                        AlertFromUser: {
                          name: '홍길동',
                          email: 'test@gmail.com',
                          Boards: {
                            id: '4a2dfd95-4a31-4e54-a66e-e24aefd5ccaf',
                            title: '제목',
                            content: '내용',
                            Comments: {
                              id: 'd17e3c82-05ae-485a-aae1-954dffd34f9c',
                              content: '댓글 내용'
                            }
                          }
                        },
                        AlertToUser: {
                          name: '김성수',
                          email: 'elice@gmail.com'
                        },
                      }
                  ],
                  plans: [
                    {
                      id: '1bc705ad-c6a3-4139-a369-c64cba883517', 
                      type: 'PLAN',
                      target_id: 'e19630da-2998-4981-8f17-a8555cf2f710',
                      checked: 0,
                      createdAt: '2023-06-03T16:19:06.000Z',
                      updatedAt: '2023-06-03T16:19:06.000Z',
                      from_user_id: '77c39723-7308-4fd9-934b-7c9ed75696e4',
                      to_user_id: '3c4bee5f-e35f-4de0-90d7-2dd8ad3d132f',
                      AlertToUser: {
                        name: '김성수',
                        email: 'elice@gmail.com'
                      },
                      planTitle: '일정 제목',
                      planContent: '일정 날짜',
                      planStartDate: '2023-06-14T18:00:00.000Z'
                    }
                  ],
                }
            }
  } */
);

module.exports = router;
