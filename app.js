const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { ENV_PORT, DB_URL } = require('./utils/config');
const limiter = require('./middlewares/limiter');
const auth = require('./middlewares/auth');

const route = require('./routes');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMessange } = require('./utils/Errors');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

mongoose.connect(DB_URL, () => {
  console.log('Connect to mydb');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(route);

app.use('/', auth, (req, res, next) => {
  next(new NotFoundError(errorMessange.pageNotFoundError));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(ENV_PORT, () => {
  console.log(`server listening on port ${ENV_PORT}`);
});
