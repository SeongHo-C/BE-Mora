const express = require('express');
const userRouter = express.Router();
const { addUser, getUserToken } = require('./controller');
const { asyncHandler, loginRequired } = require('../../middlewares');

userRouter.post('/register', loginRequired, addUser);
userRouter.post('/login', loginRequired, getUserToken);

module.exports = userRouter;
