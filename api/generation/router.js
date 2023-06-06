const express = require('express');
const router = express.Router();
const generationController = require('./controller');
const { asyncHandler, loginRequired } = require('../../middlewares');

router.post(
  '/generation',
  loginRequired,
  asyncHandler(generationController.addGeneration)
  //  #swagger.description = '기수 등록'
  //  #swagger.tags = ['generations']
  /*  #swagger.parameters[''] = {
                in: 'body',
                schema: {
                    name: 'SW',
                    phase: '1',
                }
} */
);

router.get(
  '/generation/:keyword',
  loginRequired,
  asyncHandler(generationController.getGenerations)
  //  #swagger.description = '모든 기수 정보 조회'
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
  asyncHandler(generationController.setGeneration)
  //  #swagger.description = '기수 정보 수정'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[404] = {
            description: '해당하는 기수가 존재하지 않을 경우',
            schema: {
                message: '존재하지 않는 기수 입니다.'
            }
  } */
);

router.delete(
  '/generation/:id',
  loginRequired,
  asyncHandler(generationController.deleteGeneration)
  //  #swagger.description = '기수 정보 삭제'
  //  #swagger.tags = ['generations']
  /*  #swagger.responses[404] = {
            description: '해당하는 기수가 존재하지 않을 경우',
            schema: {
                message: '기수 삭제 실패'
            }
  } */
);

module.exports = router;
