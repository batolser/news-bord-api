const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const axios=require("axios");

const bodyParser = require('body-parser');

// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT, DB } = require('./config');

let whitelist = ['http://localhost:8080', 'https://api.news-bord.students.nomoreparties.co', 'http://api.news-bord.students.nomoreparties.co', 'https://news-bord.students.nomoreparties.co', 'http://news-bord.students.nomoreparties.co','mongodb://localhost:27017/news-bord_db'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
};


const router = require('./routes/index');

// app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
}, );

// const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function callback () {
//       console.log("h");
//     });


app.use(requestLogger);


app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
