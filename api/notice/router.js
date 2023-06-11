const express = require('express');
const router = express.Router();
const noticeController = require('./controller');
const { adminRequired, loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/notices',
  adminRequired,
  serviceHandler(noticeController.addNotice)
  //  #swagger.description = '공지 등록'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[201] = {
            description: '공지 등록 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  title: '공지 제목',
                  content: '공지 내용',
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z' 
                }
            }
  } */
  /*  #swagger.responses[404] = {
            description: '관리자 ID가 존재하지 않는 경우',
            schema: {
                message: '존재하지 않는 관리자 ID입니다.'
            }
  } */
);

router.get(
  '/notices',
  loginRequired,
  serviceHandler(noticeController.getNotices)
  //  #swagger.description = '공지 검색(검색 범위 : 제목, 내용, 관리자 이름, 관리자 이메일)'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[200] = {
            description: '공지 조회 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '공지 제목',
                  content: '공지 내용',
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z',
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  Admin : 'name, email 정보'
                }
            }
  } */
);

router.get(
  '/notices/:id',
  adminRequired,
  serviceHandler(noticeController.getDetail)
  //  #swagger.description = '관리자 : 공지 상세 조회'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[200] = {
            description: '사용자 : 공지 조회 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  title: '공지 제목',
                  content: '공지 내용',
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z',
                  admin_id: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  Admin : 'name, email 정보'
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '공지 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 공지입니다.'
    }
  } */
);

router.patch(
  '/notices/:id',
  adminRequired,
  serviceHandler(noticeController.setNotice)
  //  #swagger.description = '공지 수정'
  //  #swagger.tags = ['notices']
  /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                    title: '공지 제목', 
                    content: '공지 내용',
                  }
  } */
  /*  #swagger.responses[404] = {
    description: '공지 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 공지입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '공지 수정 처리에 실패한 경우',
            schema: {
                message: '{제목} 공지 수정 처리에 실패하였습니다.'
            }
  } */
);

router.delete(
  '/notices/:id',
  adminRequired,
  serviceHandler(noticeController.deleteNotice)
  //  #swagger.description = '공지 삭제'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[404] = {
    description: '공지 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 공지입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '공지 삭제 처리에 실패한 경우',
            schema: {
                message: '{ID} 공지 삭제 처리에 실패하였습니다.'
            }
  } */
);

module.exports = router;
