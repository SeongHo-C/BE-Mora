const express = require('express');
const router = express.Router();
const reportController = require('./controller');
const { loginRequired, adminRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/reports',
  loginRequired,
  serviceHandler(reportController.addReport)
  //  #swagger.description = '신고 등록'
  //  #swagger.tags = ['reports']
  /*  #swagger.responses[201] = {
            description: '신고 등록 성공',
            schema: {
                data: [
                  {
                    id: 'dc37fbcd-49c7-4c39-84ea-1736e9714798',
                    status: 'ready',
                    type: 'board',
                    from_user_id: 'fb89daf7-75c2-4864-9650-6290a624238b',
                    to_user_id: '515c791e-dc96-4366-81d3-617324ffd537',
                    target_id: '18f4c16f-0247-4cd4-88b2-69110343bb45',
                    content: '게시글 신고합니다.',
                    updatedAt: '2023-06-08T03:23:37.472Z',
                    createdAt: '2023-06-08T03:23:37.472Z'
                  }
                ]
            }
  } */
  /*  #swagger.responses[404] = {
            description: '존재하지 않는 게시글이나 댓글인 경우',
            schema: {
                message: '존재하지 않는 게시글 OR 댓글입니다.'
            }
  } */
);

router.get(
  '/reports',
  adminRequired,
  serviceHandler(reportController.getReports)
  //  #swagger.description = '신고 검색(검색 범위 : 신고 내용, 상태, 타입, 신고자 이름, 신고자 이메일, 신고 받은자 이름, 신고 받은자 이메일)'
  //  #swagger.tags = ['reports']
  /*  #swagger.responses[200] = {
            description: '신고 조회 성공',
            schema: {
                data: [
                  {
                    id: 'dc37fbcd-49c7-4c39-84ea-1736e9714798',
                    type: 'BOARD',
                    from_user_id: 'fb89daf7-75c2-4864-9650-6290a624238b',
                    to_user_id: '515c791e-dc96-4366-81d3-617324ffd537',
                    target_id: '18f4c16f-0247-4cd4-88b2-69110343bb45',
                    content: '게시글 신고합니다.',
                    status: 'READY',
                    updatedAt: '2023-06-08T03:23:37.472Z',
                    createdAt: '2023-06-08T03:23:37.472Z',
                    FromUser: 'name, email',
                    ToUser: 'name, email'
                  }
                ]
            }
  } */
);

router.get(
  '/reports/:id/:type',
  adminRequired,
  serviceHandler(reportController.getDetailReport)
  //  #swagger.description = '신고 상세 조회'
  //  #swagger.tags = ['reports']
  /*  #swagger.responses[200] = {
            description: '신고 상세 조회 성공',
            schema: {
                data: [
                  {
                    id: 'dc37fbcd-49c7-4c39-84ea-1736e9714798',
                    type: 'BOARD',
                    from_user_id: 'fb89daf7-75c2-4864-9650-6290a624238b',
                    to_user_id: '515c791e-dc96-4366-81d3-617324ffd537',
                    target_id: '18f4c16f-0247-4cd4-88b2-69110343bb45',
                    content: '게시글 신고합니다.',
                    status: 'READY',
                    updatedAt: '2023-06-08T03:23:37.472Z',
                    createdAt: '2023-06-08T03:23:37.472Z',
                    FromUser: 'name, email',
                    ToUser: 'name, email',
                    Board: 'title, content',
                    Comment: 'content'
                  }
                ]
            }
  } */
);

router.patch(
  '/reports/:id/:status',
  adminRequired,
  serviceHandler(reportController.setReport)
  //  #swagger.description = '신고 상태 수정'
  //  #swagger.tags = ['reports']
  /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                    id: 'dc37fbcd-49c7-4c39-84ea-1736e9714798', 
                    type: 'BOARD',
                  }
  } */
  /*  #swagger.responses[404] = {
    description: '신고 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 신고입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '신고 수정 처리에 실패한 경우',
            schema: {
                message: '{ID} 신고 상태 수정 처리에 실패하였습니다.'
            }
  } */
);

router.delete(
  '/reports/:id',
  adminRequired,
  serviceHandler(reportController.deleteReport)
  //  #swagger.description = '신고 상태 삭제'
  //  #swagger.tags = ['reports']
  /*  #swagger.responses[404] = {
    description: '신고 ID가 없는 경우',
    schema: {
      message: '존재하지 않는 신고입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '신고 삭제 처리에 실패한 경우',
            schema: {
                message: '{ID} 신고 삭제 처리에 실패하였습니다.'
            }
  } */
);

module.exports = router;
