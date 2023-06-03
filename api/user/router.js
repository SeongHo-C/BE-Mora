const express = require('express');
const userRouter = express.Router();
const { addUser } = require('./controller');

userRouter.post('/join', addUser);

module.exports = userRouter;
