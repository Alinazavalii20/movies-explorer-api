const express = require('express');

const { userUpdateValid } = require('../middlewares/validation');
const { patchUser, getUser } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/users/me', getUser);

userRouter.patch('/users/me', userUpdateValid, patchUser);

module.exports = userRouter;
