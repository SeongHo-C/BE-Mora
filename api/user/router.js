const express = require('express');
const userRouter = express.Router();
const userController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

userRouter.post('/users/register', serviceHandler(userController.addUser));
userRouter.post('/users/login', serviceHandler(userController.getUserToken));
userRouter.delete(
  '/users/delete',
  loginRequired,
  serviceHandler(userController.deleteUser)
);

module.exports = userRouter;
