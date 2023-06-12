const express = require('express');
const router = express.Router();
const alertController = require('./controller');
const { loginRequired, adminRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post('/alerts', loginRequired, serviceHandler(alertController.addAlert));

module.exports = router;
