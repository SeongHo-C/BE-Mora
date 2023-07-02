const express = require('express');
const { serviceHandler } = require('../../utils');
const hashtagController = require('./controller');

const router = express.Router();

router.get('/hashtags', serviceHandler(hashtagController.getHashtags));

module.exports = router;
