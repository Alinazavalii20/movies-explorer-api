const express = require('express');

const { userGetValid, userUpdateValid } = require('../middlewares/validation');
const { patchUser, getUser } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/me', userGetValid, getUser);

userRouter.patch('/me', userUpdateValid, patchUser);

module.exports = userRouter;
