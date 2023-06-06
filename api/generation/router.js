const express = require('express');
const router = express.Router();
const generationController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/generation',
  loginRequired,
  serviceHandler(generationController.addGeneration)
  //  #swagger.description = '관리자 : 기수 등록'
  //  #swagger.tags = ['generations']
  /*  #swagger.parameters[''] = {
                in: 'body',
                schema: {
                    name: 'SW',
                    phase: '1',
                }
  } */
  /*  #swagger.responses[400] = {
            description: '해당하는 기수가 존재하지 않을 경우',
            schema: {
                message: '이미 존재하는 기수입니다.'
            }
  } */
);

router.get(
  '/generation/:keyword',
  loginRequired,
  serviceHandler(generationController.getGenerations)
  //  #swagger.description = '관리자, 사용자 : 모든 기수 정보 조회 (검색 범위 : name, phase)'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[201] = {
            description: '기수 정보 조회 성공',
            schema: {
                data: [
                  {
                    id: 'uuid', 
                    name: 'SW',
                    phase: '1',
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z'
                  }
                ]
            }
  } */
);

router.patch(
  '/generation/:id',
  loginRequired,
  serviceHandler(generationController.setGeneration)
  //  #swagger.description = '관리자 : 기수 정보 수정'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[400] = {
            description: '기수 수정 처리에 실패한 경우',
            schema: {
                message: '기수 수정 처리에 실패했습니다.'
            }
  } */
  /*  #swagger.responses[404] = {
            description: '해당하는 기수가 존재하지 않을 경우',
            schema: {
                message: '존재하지 않는 기수입니다.'
            }
  } */
);

router.delete(
  '/generation/:id',
  loginRequired,
  serviceHandler(generationController.deleteGeneration)
  //  #swagger.description = '관리자 : 기수 정보 삭제'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[400] = {
            description: '기수 삭제 처리에 실패한 경우',
            schema: {
                message: '기수 삭제 처리에 실패했습니다.'
            }
  } */
  /*  #swagger.responses[404] = {
            description: '해당하는 기수가 존재하지 않을 경우',
            schema: {
                message: '존재하지 않는 기수입니다.'
            }
  } */
);

module.exports = router;
