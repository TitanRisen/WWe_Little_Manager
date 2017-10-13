var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require("multer");

var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var test_1= require('./routes/test_1');
var judge = require('./routes/judge');
var test = require('./routes/test');
var app = express();

// //设置视图文件的存放路径
 app.set('views', path.join(__dirname, 'views'));
// //封装ejs引擎，注册html引擎
// //之所以要这么做是为了创建模板文件时，可以使用代码补全功能
 app.engine("html",require("ejs").renderFile);
// //设置视图引擎
 app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'uploads')));
//2、配置multer中间件参数;
//app.use(multer({ dest: './uploads/'}),function(req,res){});

app.use('/', index);
app.use('/users', users);
app.use('/upload',upload);
app.use('/test_1',test_1);
app.use('/test',test);
//审核用
app.use('/judge',judge);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var app = express();

// //设置视图文件的存放路径
// app.set('views', path.join(__dirname, 'views'));
// //封装ejs引擎，注册html引擎
// //之所以要这么做是为了创建模板文件时，可以使用代码补全功能
// app.engine("html",require("ejs").renderFile);
// //设置视图引擎
 //app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


 app.set('views', path.join(__dirname, 'views'));
// //封装ejs引擎，注册html引擎
// //之所以要这么做是为了创建模板文件时，可以使用代码补全功能
 app.engine("html",require("ejs").renderFile);
// //设置视图引擎
 app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//图片文件夹
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', index);
app.use('/test', test);
app.use('/users', users);
var test_1= require('./routes/test_1');
app.use('/test_1',test_1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
*/