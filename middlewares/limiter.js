const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 200,
  handler: (req, res) => res.status(429).json({
    error: 'Много запросов, повторите Ваш запрос позднее',
  }),
});

module.exports = limiter;
