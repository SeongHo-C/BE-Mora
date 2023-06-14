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
                  User : {
                      name: '김성수',
                      email: 'elice@gmail.com'
                  },
                  Photos : [
                      {
                          path: 'uploads\\\\lovelycat1686417123854.jpg'
                      },
                      {
                          path: 'uploads\\\\lovelycat1686417123854.jpg'
                      },
                  ],
                }
            }
  } */
);

router.get(
  '/adminBoards/:id',
  adminRequired,
  serviceHandler(adminBoardController.getDetail)
  //  #swagger.description = '게시글 상세 검색'
  //  #swagger.tags = ['admin-board']
  /*  #swagger.responses[200] = {
            description: '게시글 상세 조회 성공',
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
                    User : {
                      name: '김성수',
                      email: 'elice@gmail.com'
                    },
                    Photos : [
                        {
                            path: 'uploads\\\\lovelycat1686417123854.jpg'
                        },
                        {
                            path: 'uploads\\\\lovelycat1686417123854.jpg'
                        },
                    ],
                    Comments : [
                        {
                            content: '댓1',
                            User: {
                                name: '김성수',
                                email: 'elice@gmail.com'
                            }
                        },
                        {
                            content: '댓2',
                            User: {
                                name: '홍길동',
                                email: 'test@gmail.com'
                            }
                        }
                    ],
                    Hashtags : [
                        {
                            title: 'html'
                        },
                        {
                            title: 'javascript'
                        },
                        {
                            title: 'css'
                        }
                    ],
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
  //  #swagger.description = '게시글 삭제'
  //  #swagger.tags = ['admin-board']
  /*  #swagger.responses[200] = {
            description: '게시글 삭제 성공',
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
                    User : {
                      name: '김성수',
                      email: 'elice@gmail.com'
                    },
                    Photos : [
                        {
                            path: 'uploads\\\\lovelycat1686417123854.jpg'
                        },
                        {
                            path: 'uploads\\\\lovelycat1686417123854.jpg'
                        },
                    ],
                    Comments : [
                        {
                            content: '댓1',
                            User: {
                                name: '김성수',
                                email: 'elice@gmail.com'
                            }
                        },
                        {
                            content: '댓2',
                            User: {
                                name: '홍길동',
                                email: 'test@gmail.com'
                            }
                        }
                    ],
                    Hashtags : [
                        {
                            title: 'html'
                        },
                        {
                            title: 'javascript'
                        },
                        {
                            title: 'css'
                        }
                    ],
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

router.delete(
  '/adminBoards/comment/:id',
  adminRequired,
  serviceHandler(adminBoardController.deleteComment)
  //  #swagger.description = '댓글 삭제'
  //  #swagger.tags = ['admin-board']
  /*  #swagger.responses[200] = {
            description: '댓글 삭제 성공',
            schema: {
                data: {
                    id: '2a23dffa-bdaa-4100-9f21-918e81644db0', 
                    content: '내용',
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z',
                    board_id: '56dc6f70-de6f-40f7-ac40-3e1081c69ce5',
                    commenter: 'ae38d389-7804-4e7d-9d8f-c2618799ce3f',
                    User : {
                      name: '김성수',
                      email: 'elice@gmail.com'
                    }
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '댓글 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 댓글입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
    description: '댓글 삭제 처리에 실패한 경우',
    schema: {
      message: '댓글 삭제 처리에 실패하였습니다.'
    }
  } */
);

module.exports = router;
