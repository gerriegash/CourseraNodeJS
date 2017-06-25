/**
 * Created by Gerry Hanjra on 6/25/2017.
 */


var http = require('http');

var hostName = "localhost";
var port = 6969;

var server = http.createServer(function(req,res) {
     console.log(req.headers);
    res.writeHead('200',{"Content-Type":"text/html"});
    res.end("<h1>Hello World</h1>");
    });

server.listen(port,hostName,()=>console.log("Server strating up at ${port} and host name ${hostName}"))