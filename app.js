require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middlewares/auth');
const Router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMessange = require('./utils/Errors');
const limiter = require('./middlewares/limiter');

const { PORT = 3001 } = process.env;
const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb', () => {
  console.log('Connect to mydb');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(Router);

app.use('/', auth, (req, res, next) => {
  next(new NotFoundError(errorMessange.pageNotFoundError));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
