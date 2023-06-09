const express = require('express');
const userRouter = express.Router();
const userController = require('./controller');
const { serviceHandler } = require('../../utils');

userRouter.post('/users/register', serviceHandler(userController.addUser));
userRouter.post('/users/login', serviceHandler(userController.getUserToken));

module.exports = userRouter;
