const express = require('express');
const router = express.Router();
const noticeController = require('./controller');
const { adminRequired, loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/notice',
  adminRequired,
  serviceHandler(noticeController.addNotice)
  //  #swagger.description = '공지 등록'
  //  #swagger.tags = ['notices']
);

router.get(
  '/notice/admin',
  adminRequired,
  serviceHandler(noticeController.getNotices)
  //  #swagger.description = '관리자 : 공지 검색 (검색 범위 : 제목, 내용, 관리자 이름, 관리자 이메일)'
  //  #swagger.tags = ['notices']
);

router.get(
  '/notice/user',
  loginRequired,
  serviceHandler(noticeController.getNotices)
  //  #swagger.description = '사용자 : 공지 검색 (검색 범위 : 제목, 내용, 관리자 이름, 관리자 이메일)'
  //  #swagger.tags = ['notices']
);

router.patch(
  '/notice/:id',
  adminRequired,
  serviceHandler(noticeController.setNotice)
  //  #swagger.description = '공지 수정'
  //  #swagger.tags = ['notices']
);

router.delete(
  '/notice/:id',
  adminRequired,
  serviceHandler(noticeController.deleteNotice)
  //  #swagger.description = '공지 삭제'
  //  #swagger.tags = ['notices']
);

module.exports = router;
