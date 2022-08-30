const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/config');

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnAuthtorizeError = require('../errors/UnAuthtorizeError');
const { errorMessange } = require('../utils/Errors');

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnAuthtorizeError(errorMessange.authorizationUserError));
    });
};

module.exports.getUser = async (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessange.userNotFoundError));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessange.idError));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, email, password, _id,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    /* .then((({ _id }) => User.findById(_id))) */
    .then(() => res.status(200).send({
      data: {
        name, email, _id,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError(errorMessange.emailUserError);
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError(errorMessange.authorizationUserError);
      }
      next(err);
    })
    .catch(next);
};

module.exports.patchUser = async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError(errorMessange.authorizationUserError));
      }
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessange.idError));
      }
      if (err.code === 11000) {
        next(new ConflictError(errorMessange.emailUserError));
      }
      next(err);
    });
};
