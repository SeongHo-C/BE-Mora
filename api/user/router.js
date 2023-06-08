const express = require('express');
const userRouter = express.Router();
const userController = require('./controller');
const { serviceHandler } = require('../../utils');

userRouter.post('/user/register', serviceHandler(userController.addUser));
userRouter.post('/user/login', serviceHandler(userController.getUserToken));

module.exports = userRouter;
