const express = require('express');
const { loginRequired } = require('../../middlewares');
const commentController = require('./controller');

const router = express.Router();

router.post('/', loginRequired, commentController.setComment);
router.patch('/', loginRequired, commentController.updateComment);
router.delete('/', loginRequired, commentController.deleteComment);

module.exports = router;
