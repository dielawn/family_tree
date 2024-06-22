const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const port = process.env.PORT

const app = express();
app.set('env', 'development');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const router = require('./router');
app.use('/', router);

// const usersRouter = require('./users');
// app.use('/users', usersRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect to db then start server
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });
});

db.on('error', (error) => {
  console.error('Database connection error:', error)
});

module.exports = app;
