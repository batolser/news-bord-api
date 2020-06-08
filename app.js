const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT } = require('./config');

const router = require('./routes/index');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/news-bord_db', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
});

app.use(requestLogger);


app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
