/**
 * Created by Gerry Hanjra on 6/25/2017.
 */

var express = require('express');
var morgan = require('morgan');

var hostName = "localhost";
var port = 1234;

var app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));

app.use(function(req,res,next){
    console.log(req.headers);
    res.writeHead('200',{"Content-Type":"text/html"});
    res.end("<h1>Hello World</h1>");
})

//console.log(__dirname+'\\public');
//console.log(__filename);

app.listen(port,hostName,function(){console.log(`Server strating up at ${port} and hostname ${hostName}`)});