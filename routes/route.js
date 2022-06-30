const express = require('express');
const { loginUsersValid, createUserValid } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/user');

const route = express.Router();

route.post('/signup', createUserValid, createUser);

route.post('/signin', loginUsersValid, login);

module.exports = route;
