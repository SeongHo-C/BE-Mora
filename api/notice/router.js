const express = require('express');
const router = express.Router();
const noticeController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/notice',
  loginRequired,
  serviceHandler(noticeController.addNotice)
  //  #swagger.description = '공지 등록'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[201] = {
            description: '공지 등록 성공',
            schema: {
                data: [
                  {
                    id: '2dfa7641-5498-44cf-9c0e-b7aea36b4e3f', 
                    title: '공지', 
                    content: '공지 내용', 
                    createdAt: '2023-06-03T15:02:55.000Z'
                    updatedAt: '2023-06-03T15:02:55.000Z'
                  }
                ]
            }
  } */
  /*  #swagger.responses[401] = {
            description: '관리자 정보에 등록된 id가 아닌 경우',
            schema: {
                message: '존재하지 않는 관리자 ID입니다.
            }
  } */
);

router.get(
  '/notice/:keyword',
  loginRequired,
  serviceHandler(noticeController.getNotices)
  //  #swagger.description = '관리자, 사용자 : 공지 검색 (검색 범위 : 제목, 내용, 관리자 이름, 관리자 이메일)'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[200] = {
            description: '공지 조회 성공',
            schema: {
                data: [
                  {
                    id: '2dfa7641-5498-44cf-9c0e-b7aea36b4e3f', 
                    title: '공지', 
                    content: '공지 내용', 
                    createdAt: '2023-06-03T15:02:55.000Z'
                    updatedAt: '2023-06-03T15:02:55.000Z'
                    admin_id: '1c711f6d-62b2-4407-8b4d-6b9cad9950b5'
                    Admin: {
                      name : 관리자2',
                      email : admin2'
                    }
                  }
                ]
            }
  } */
);

router.patch(
  '/notice',
  loginRequired,
  serviceHandler(noticeController.setNotice)
  //  #swagger.description = '공지 수정'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[400] = {
            description: '해당하는 공지가 존재하지 않을 경우',
            schema: {
                message: '존재하지 않는 공지입니다.'
            }
  } */
  /*  #swagger.responses[404] = {
            description: '공지 수정 처리에 실패한 경우',
            schema: {
                message: '{제목} 공지 수정 처리에 실패하였습니다.'
            }
  } */
);

router.delete(
  '/notice/:id',
  loginRequired,
  serviceHandler(noticeController.deleteNotice)
  //  #swagger.description = '공지 삭제'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[400] = {
            description: '해당하는 공지가 존재하지 않을 경우',
            schema: {
                message: '존재하지 않는 게시글입니다.'
            }
  } */
  /*  #swagger.responses[404] = {
            description: '공지 삭제 처리에 실패한 경우',
            schema: {
                message: '{아이디} 공지 삭제 처리에 실패하였습니다.'
            }
  } */
);

module.exports = router;
