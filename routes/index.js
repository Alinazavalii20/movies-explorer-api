const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');

const { userRouter } = require('./users');
const { moviesRouter } = require('./movies');
const { loginUsersValid, createUserValid } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/user');

router.post('/signup', createUserValid, createUser);
router.post('/signin', loginUsersValid, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
