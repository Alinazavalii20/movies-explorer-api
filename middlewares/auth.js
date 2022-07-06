const jwt = require('jsonwebtoken');
const UnAuthtorizeError = require('../errors/UnAuthtorizeError');
const { errorMessange } = require('../utils/Errors');
const { JWT_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnAuthtorizeError(errorMessange.authorizationError));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_KEY);
    } catch (err) {
      next(new UnAuthtorizeError(errorMessange.authorizationError));
      return;
    }

    req.user = payload;
  }
  next();
};
