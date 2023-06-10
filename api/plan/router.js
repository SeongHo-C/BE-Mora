const express = require('express');
const router = express.Router();
const planController = require('./controller');
const { adminRequired, loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/plans',
  adminRequired,
  serviceHandler(planController.addPlan)
  //  #swagger.description = '일정 등록'
  //  #swagger.tags = ['plans, planLinks']
  /*  #swagger.responses[201] = {
            description: '일정 등록 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '일정 제목',
                  content: '일정 내용',
                  start_date: '2023-06-03T16:19:06.000Z',
                  end_date: '2023-06-03T16:19:06.000Z', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z', 
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  PlanLinks: '[ { id, url },{ id, url } ... ]',
                  Admin: 'name, email'
                }
            }
  } */
  /*  #swagger.responses[400] = {
        description: 'end_date가 start_date보다 앞의 일자인 경우',
        schema: {
            message: 'end_date는 start_date보다 앞선 일자일 수 없습니다.'
        }
  } */
  /*  #swagger.responses[404] = {
        description: '일정ID가 존재하지 않는 경우',
        schema: {
            message: '{ID}는 존재하지 않는 일정입니다.'
        }
  } */
  /*  #swagger.responses[500] = {
        description: '일정 OR 일정 링크 등록 처리에 실패한 경우',
        schema: {
            message: '일정 OR 일정 링크 등록 처리에 실패하였습니다.'
        }
  } */
);

router.get(
  '/plans/ym/:yearMonth',
  loginRequired,
  serviceHandler(planController.getYearMonth)
  //  #swagger.description = '년월 일정 조회'
  //  #swagger.tags = ['plans, planLinks']
  /*  #swagger.responses[200] = {
            description: '년월 일정 조회 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '일정 제목',
                  content: '일정 내용',
                  start_date: '2023-06-03T16:19:06.000Z',
                  end_date: '2023-06-03T16:19:06.000Z', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z', 
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  PlanLinks: '[ { id, url },{ id, url } ... ]',
                  Admin: 'name, email'
                }
            }
  } */
);

router.get(
  '/plans/ymd/:yearMonthDay',
  loginRequired,
  serviceHandler(planController.getYearMonthDay)
  //  #swagger.description = '년월일 일정 조회'
  //  #swagger.tags = ['plans, planLinks']
  /*  #swagger.responses[200] = {
            description: '년월일 일정 조회 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '일정 제목',
                  content: '일정 내용',
                  start_date: '2023-06-03T16:19:06.000Z',
                  end_date: '2023-06-03T16:19:06.000Z', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z', 
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  PlanLinks: '[ { id, url }, { id, url } ... ]',
                  Admin: 'name, email'
                }
            }
  } */
);

router.patch(
  '/plans/:id',
  adminRequired,
  serviceHandler(planController.setPlan)
  //  #swagger.description = '일정 수정'
  //  #swagger.tags = ['plans, planLinks']
  /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                    id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                    title: '일정 제목',
                    content: '일정 내용',
                    start_date: '2023-06-03T16:19:06.000Z',
                    end_date: '2023-06-03T16:19:06.000Z',
                    links: '[ { url }, { url } ... ]'
                  }
  } */
  /*  #swagger.responses[200] = {
            description: '일정 수정 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '일정 제목',
                  content: '일정 내용',
                  start_date: '2023-06-03T16:19:06.000Z',
                  end_date: '2023-06-03T16:19:06.000Z', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z', 
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  PlanLinks: '[ { id, url }, { id, url } ... ]',
                  Admin: 'name, email'
                }
            }
  } */
  /*  #swagger.responses[400] = {
        description: 'end_date가 start_date보다 앞의 일자인 경우',
        schema: {
            message: 'end_date는 start_date보다 앞선 일자일 수 없습니다.'
        }
  } */
  /*  #swagger.responses[404] = {
        description: '일정 ID가 없는 경우',
        schema: {
          message: '존재하지 않는 일정입니다.'
        }
  } */
  /*  #swagger.responses[500] = {
        description: '일정 링크 : 삭제, 생성 / 일정 : 수정 처리에 실패한 경우',
        schema: {
            message: '일정 링크 : 삭제, 생성 / 일정 : 수정 처리에 실패하였습니다.'
        }
  } */
);

router.delete(
  '/plans/:id',
  adminRequired,
  serviceHandler(planController.deletePlan)
  //  #swagger.description = '일정 삭제'
  //  #swagger.tags = ['plans, planLinks']
  /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                    id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                    title: '일정 제목',
                    content: '일정 내용',
                    start_date: '2023-06-03T16:19:06.000Z',
                    end_date: '2023-06-03T16:19:06.000Z',
                    links: '[ { url }, { url } ... ]'
                  }
  } */
  /*  #swagger.responses[200] = {
            description: '일정 수정 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '일정 제목',
                  content: '일정 내용',
                  start_date: '2023-06-03T16:19:06.000Z',
                  end_date: '2023-06-03T16:19:06.000Z', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z', 
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  PlanLinks: '[ { id, url }, { id, url } ... ]',
                  Admin: 'name, email'
                }
            }
  } */
  /*  #swagger.responses[404] = {
        description: '일정 ID가 없는 경우',
        schema: {
          message: '존재하지 않는 일정입니다.'
        }
  } */
  /*  #swagger.responses[500] = {
        description: '일정 OR 일정 링크 삭제 처리에 실패한 경우',
        schema: {
            message: '일정 OR 일정 링크 삭제 처리에 실패하였습니다.'
        }
  } */
);

module.exports = router;
