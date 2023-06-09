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
  /*  #swagger.responses[404] = {
            description: '일정ID가 존재하지 않는 경우',
            schema: {
                message: '{ID}는 존재하지 않는 일정입니다.'
            }
  } */
  /*  #swagger.responses[500] = {
            description: '일정 등록 처리에 실패한 경우',
            schema: {
                message: '일정 등록 처리에 실패하였습니다.'
            }
  } */
);

module.exports = router;
