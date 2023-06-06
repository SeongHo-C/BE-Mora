const express = require('express');
const router = express.Router();
const reportController = require('./controller');
const { asyncHandler, loginRequired } = require('../../middlewares');

router.post(
  '/report',
  loginRequired,
  asyncHandler(reportController.addReport)
  //  #swagger.description = '신고 등록'
  //  #swagger.tags = ['reports']
);

router.get(
  '/report/all',
  loginRequired,
  asyncHandler(reportController.getAllReports)
  //  #swagger.description = '모든 신고 조회'
  //  #swagger.tags = ['reports']
);

router.get(
  '/report',
  loginRequired,
  asyncHandler(reportController.getUserReports)
  //  #swagger.description = '로그인 한 유저의 신고 목록 조회'
  //  #swagger.tags = ['reports']
);

router.get(
  '/report/:keyword',
  loginRequired,
  asyncHandler(reportController.getReports)
  //  #swagger.description = '신고 검색 - 신고 내용, 유저명, 유저 이메일, 게시글 제목, 게시글 내용'
  //  #swagger.tags = ['reports']
);

module.exports = router;
