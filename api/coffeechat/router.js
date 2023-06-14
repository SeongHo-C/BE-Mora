const express = require('express');
const router = express.Router();
const coffeechatController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/coffeechats',
  loginRequired,
  serviceHandler(coffeechatController.addCoffeechat)
  //  #swagger.description = '커피챗 등록 및 이메일 발송'
  //  #swagger.tags = ['coffeechats']
  /*  #swagger.responses[201] = {
            description: '커피챗 등록 성공',
            schema: {
                data: {
                  id: '0dabae0a-7c6a-4992-9efa-decb996d40aa', 
                  profile_id: '76a60264-2989-4e8a-8d7e-d93c241bba05',
                  user_id: '858d5e56-d829-4105-9de8-c23d4e9e8f1f'
                }
            }
  } */
  /*  #swagger.responses[400] = {
            description: '이미 신청했던 커피챗인 경우',
            schema: {
                message: '이미 신청된 커피챗입니다.'
            }
  } */
  /*  #swagger.responses[500] = {
            description: '커피챗 생성 처리에 실패한 경우',
            schema: {
                message: '커피챗 생성에 실패하였습니다.'
            }
  } */
);

module.exports = router;
