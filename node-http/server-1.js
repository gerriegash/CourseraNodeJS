/**
 * Created by Gerry Hanjra on 6/25/2017.
 */


var http = require('http');
var path = require('path');
var fs = require('fs');

var hostName = "localhost";
var port = 6969;

var server = http.createServer(function(req,res) {

    console.log("Request from ${req.url} came for ${req.method} ");

    //just to not let server crash
    req.on('error',function(error){
       console.error("'Errr! SOme error happenend");
    });

    console.log("mplemented error listener");
    if(req.method == "GET"){

        var fileUrl;
        if(req.url == "/")fileUrl = "/index.html";
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        var fileExtName = path.extname(filePath);

        if(fileExtName === ".html"){
            fs.exists(filePath,function(exists){

                if(!exists){
                    res.writeHead(404,{'Content-Type':"text/html"});
                    res.end('<h1>404 error</h1>file not found.');
                }
                res.writeHead(200,{'Content-Type':"text/html"});
                fs.createReadStream(filePath).pipe(res);
            })
        } else{
            res.writeHead(404,{'Content-Type':"text/html"});
            res.end('<h1>404 Error</h1>File not of type HTML');
        }

    } else{
        res.writeHead(404,{'Content-Type':"text/html"});
        res.end('<h1>404 Error</h1>The operation ${req.method} not supported');
    }

    });

server.listen(port,hostName,()=>console.log("Server strating up at ${port}"))