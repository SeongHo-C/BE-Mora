const express = require('express');
const router = express.Router();
const generationController = require('./controller');
const { adminRequired, loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/generations',
  adminRequired,
  serviceHandler(generationController.addGeneration)
  //  #swagger.description = '관리자 : 기수 등록'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[201] = {
            description: '기수 등록 성공',
            schema: {
                data: [
                  {
                    id: '903a6547-6f39-4bfb-b912-8d4b9bff451f',
                    name: 'SW',
                    phase: '1',
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z'
                  }
                ]
            }
  } */
  /*  #swagger.responses[400] = {
            description: '등록하는 기수가 존재하는 기수인 경우',
            schema: {
                message: '이미 존재하는 기수입니다.'
            }
  } */
);

router.get(
  '/generations/admin',
  adminRequired,
  serviceHandler(generationController.getGenerations)
  //  #swagger.description = '관리자 : 모든 기수 정보 조회 (검색 범위 : name, phase)'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[200] = {
            description: '기수 정보 조회 성공',
            schema: {
                data: [
                  {
                    id: '903a6547-6f39-4bfb-b912-8d4b9bff451f',
                    name: 'SW',
                    phase: '1',
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z'
                  }
                ]
            }
  } */
);

router.get(
  '/generations/user',
  loginRequired,
  serviceHandler(generationController.getGenerations)
  //  #swagger.description = '사용자 : 모든 기수 정보 조회 (검색 범위 : name, phase)'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[200] = {
            description: '기수 정보 조회 성공',
            schema: {
                data: [
                  {
                    id: '903a6547-6f39-4bfb-b912-8d4b9bff451f', 
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
  '/generations/:id',
  adminRequired,
  serviceHandler(generationController.setGeneration)
  //  #swagger.description = '관리자 : 기수 정보 수정'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[404] = {
            description: '해당하는 기수가 존재하지 않는 경우',
            schema: {
                message: '존재하지 않는 기수입니다.'
            }
  } */
  /*  #swagger.responses[500] = {
            description: '기수 수정 처리에 실패한 경우',
            schema: {
                message: '{트랙명} 기수 수정 처리에 실패하였습니다.'
            }
  } */
);

router.delete(
  '/generations/:id',
  adminRequired,
  serviceHandler(generationController.deleteGeneration)
  //  #swagger.description = '관리자 : 기수 정보 삭제'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[404] = {
            description: '해당하는 기수가 존재하지 않는 경우',
            schema: {
                message: '존재하지 않는 기수입니다.'
            }
  } */
  /*  #swagger.responses[500] = {
            description: '기수 삭제 처리에 실패한 경우',
            schema: {
                message: '{ID} 기수 삭제 처리에 실패하였습니다.'
            }
  } */
);

module.exports = router;
