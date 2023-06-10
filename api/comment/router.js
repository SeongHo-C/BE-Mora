const express = require('express');
const { loginRequired } = require('../../middlewares');
const commentController = require('./controller');
const { serviceHandler } = require('../../utils');

const router = express.Router();

router.post(
  '/comment',
  loginRequired,
  serviceHandler(commentController.setComment)
);
router.patch(
  '/comment',
  loginRequired,
  serviceHandler(commentController.updateComment)
);
router.delete(
  '/comment',
  loginRequired,
  serviceHandler(commentController.deleteComment)
);

module.exports = router;
