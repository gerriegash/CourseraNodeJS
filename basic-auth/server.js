var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var hostname = 'localhost';
var port = 3000;

//var dishRouter = require('./routeConfigs/dishRouter.js')
//var promoRouter = require('./routeConfigs/promoRouter.js')
//var leaderRouter = require('./routeConfigs/leaderRouter.js')

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321')); //Secret one

function auth (req, res, next) {

    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            res.cookie('user','admin',{signed: true});
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.signedCookies.user === 'admin') {
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
};

app.use(auth);

//Let us make error handler that takes acrea of all errors we egenarted.
function errorHandler(err,req,res,next){
    res.writeHead(err.status || 500,{
        'WWW-Authenticate':'Basic',
        'Content-Type':'text/plain'
    })
    res.end(err.message);

}


//app.use("/dishes",dishRouter);
//app.use("/promotions",promoRouter);
//app.use("/leadership",leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
        });
/**
 * Created by Gerry Hanjra on 6/26/2017.
 */
