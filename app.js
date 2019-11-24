const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


let Task = require('./api/models/todoListModel');
let todoList = require('./api/controllers/todoListController.js');
const dbAddress = 'mongodb+srv://userdb:9R89pNDCLx8z1CcQ@cluster0-bx7mg.mongodb.net/TODOdb?retryWrites=true&w=majority';
const app = express();

async function connectDB() {
  await mongoose.connect(dbAddress,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const fill = await Task.findOne();
  if(!fill){
    const task = new Task({
      name: 'test Task'
    })
    await task.save();
  }
  console.log('DB connected')
}
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Enable Cross-Origin Resource Sharing

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
