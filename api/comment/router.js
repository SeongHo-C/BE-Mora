const express = require('express');
const { loginRequired } = require('../../middlewares');
const commentController = require('./controller');
const { serviceHandler } = require('../../utils');

const router = express.Router();

router.post(
  '/comments',
  loginRequired,
  serviceHandler(commentController.setComment)
);
router.patch(
  '/comments',
  loginRequired,
  serviceHandler(commentController.updateComment)
);
router.delete(
  '/comments',
  loginRequired,
  serviceHandler(commentController.deleteComment)
);

module.exports = router;
