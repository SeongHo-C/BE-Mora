const express = require('express');
const linkRouter = express.Router();
const linkController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

/**
 * 링크 조회
 */
linkRouter.get(
  '/links',
  loginRequired,
  serviceHandler(linkController.getLinks)
);

/**
 * 링크 등록
 */
linkRouter.post(
  '/links',
  loginRequired,
  serviceHandler(linkController.addLink)
);

/**
 * 링크 수정
 */
linkRouter.put(
  '/links/update',
  loginRequired,
  serviceHandler(linkController.updateLink)
);

/**
 * 링크 삭제
 */
linkRouter.delete(
  '/links/delete',
  loginRequired,
  serviceHandler(linkController.deleteLink)
);

module.exports = linkRouter;
