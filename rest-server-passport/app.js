var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var authenticate = require('./authenticate');
var passport = require('passport');
var passportLocal = require('passport-local');

var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);

var db  = mongoose.connection;

db.on('error',console.error.bind(console,'conection error'));
db.once('open',function(){
  console.log("We are open for db business.");
})

var index = require('./routes/index');
var users = require('./routes/users');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');
var dishRouter = require('./routes/dishRouter'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();



app.all('*',function(req,res,next){
  if(req.secure){
    return next();
  }else{
    res.redirect('https://'+req.hostname+':' + app.get('secPort')+ req.url);
  }
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport config
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes',dishRouter);
app.use('/leadership',leaderRouter);
app.use('/promotions',promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log(err);
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