const express = require('express');
const { loginRequired } = require('../../middlewares');
const likeController = require('./controller');
const { serviceHandler } = require('../../utils');

const router = express.Router();

router.post('/likes', loginRequired, serviceHandler(likeController.setLike));

module.exports = router;
