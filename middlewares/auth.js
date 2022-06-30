const jwt = require('jsonwebtoken');
const UnAuthtorizeError = require('../errors/UnAuthtorizeError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnAuthtorizeError('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new UnAuthtorizeError('Необходима авторизация'));
      return;
    }

    req.user = payload;
  }
  next();
};
