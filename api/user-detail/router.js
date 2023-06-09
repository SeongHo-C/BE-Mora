const express = require('express');
const userDetailRouter = express.Router();
const userDetalController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

userDetailRouter.get(
  '/users/mypage',
  loginRequired,
  serviceHandler(userDetalController.getProfile)
);

userDetailRouter.put(
  '/users/mypage/edit',
  loginRequired,
  serviceHandler(userDetalController.setProfile)
);

module.exports = userDetailRouter;
