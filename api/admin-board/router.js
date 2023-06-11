const express = require('express');
const adminBoardController = require('./controller');
const router = express.Router();
const { adminRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.get(
  '/adminBoards',
  adminRequired,
  serviceHandler(adminBoardController.getBoards)
  //  #swagger.description = '게시판 검색(검색 범위 : 제목, 내용, 작성자명, 작성자 이메일)'
  //  #swagger.tags = ['admin-board']
  /*  #swagger.responses[200] = {
            description: '게시판 조회 성공',
            schema: {
                data: {
                  id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                  category: 'free',
                  title: '제목',
                  content: '내용',
                  view_cnt: 0,
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z',
                  writer: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                  User : '{ name, email }',
                  Photos : '[ {path, origin_name}, {path, origin_name} ... ]'
                }
            }
  } */
);

router.get(
  '/adminBoards/:id',
  adminRequired,
  serviceHandler(adminBoardController.getDetail)
  //  #swagger.description = '게시판 상세 검색'
  //  #swagger.tags = ['admin-board']
  /*  #swagger.responses[200] = {
            description: '게시판 상세 조회 성공',
            schema: {
                data: {
                  board:{
                    id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                    category: 'free',
                    title: '제목',
                    content: '내용',
                    view_cnt: 0,
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z',
                    writer: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                    User : '{ name, email }',
                    Photos : '[ {path, origin_name}, {path, origin_name} ... ]',
                    Comments : '[ { content, User: { name, email } }, { content, User: { name, email } } ... ]',
                    Hashtags : '[ { title }, { title } ... ]',
                  },
                  likeCnt: 3
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '게시글 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 게시글입니다.'
    }
  } */
);

router.delete(
  '/adminBoards/:id',
  adminRequired,
  serviceHandler(adminBoardController.deleteBoard)
  //  #swagger.description = '게시판 삭제'
  //  #swagger.tags = ['admin-board']
  /*  #swagger.responses[200] = {
            description: '게시판 삭제 성공',
            schema: {
                data: {
                  board:{
                    id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5', 
                    category: 'free',
                    title: '제목',
                    content: '내용',
                    view_cnt: 0,
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z',
                    writer: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                    User : '{ name, email }',
                    Photos : '[ {path, origin_name}, {path, origin_name} ... ]',
                    Comments : '[ { content, User: { name, email } }, { content, User: { name, email } } ... ]',
                    Hashtags : '[ { title }, { title } ... ]',
                  },
                  likeCnt: 3
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '게시글 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 게시글입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
    description: '게시글 삭제 처리에 실패한 경우',
    schema: {
      message: '게시글 삭제 처리에 실패하였습니다.'
    }
  } */
);

module.exports = router;
