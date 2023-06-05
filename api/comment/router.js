const express = require('express');
const { loginRequired } = require('../../middlewares');
const commentController = require('./controller');

const router = express.Router();

router.post('/', loginRequired, commentController.setComment);

module.exports = router;
