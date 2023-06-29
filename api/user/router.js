const express = require('express');
const userRouter = express.Router();
const userController = require('./controller');
const { loginRequired, refreshAccessToken } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

userRouter.post('/users/register', serviceHandler(userController.addUser));
userRouter.post('/users/login', serviceHandler(userController.getUserToken));
userRouter.delete(
  '/users/delete',
  loginRequired,
  serviceHandler(userController.deleteUser)
);
userRouter.post('/users/refresh-token', refreshAccessToken);

module.exports = userRouter;
