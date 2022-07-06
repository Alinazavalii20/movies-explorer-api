const express = require('express');

const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

const { loginUsersValid, createUserValid } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/user');

const router = express.Router();

router.post('/signup', createUserValid, createUser);
router.post('/signin', loginUsersValid, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
