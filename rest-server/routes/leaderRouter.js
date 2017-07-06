/**
 * Created by Gerry Hanjra on 6/26/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leaders = require('../models/leaders');

var leadershipRouter = express.Router();

leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
    .get(function(req,res,next){
        Leaders.find({},function(err,leader){
            if(err)console.log(err);
            else res.json(leader);
        })
    })

    .post(function(req, res, next){
        Leaders.create(req.body,function(err,result){
            if(err)console.log(err)
            else {
                res.writeHead(200,{'Content-Type':'text-plain'})
                res.end('we created leader with id '+ result._id)};
        })
    })

    .delete(function(req, res, next){
        Leaders.remove({},function(err,result){
            if (err)console.log(err);
            else res.json(result);
        })
    });

leadershipRouter.route('/:leaderId')

    .get(function(req,res,next){
        Leaders.findById((req.params.leaderId),function(err,leader){
            if(err)console.log(err);
            else res.json(leader);
        })
    })

    .put(function(req, res, next){
        Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true},function(err,result){
            if(err)console.log(err)
            else res.json(result);
        })
    })

    .delete(function(req, res, next){
        Leaders.findByIdAndRemove(req.params.leaderId,function(err,result){
            if (err)console.log(err);
            else res.json(result);
        })
    });

leadershipRouter.route('/:leaderId/comments')

    .get(function(req,res,next){
        Leaders.find({},function(err,leader){
            if(err)console.log(err);
            else
                res.json(leader[0].comments);
            console.log((leader));
        })
    })

    .post(function(req, res, next){
        Leaders.findById(req.params.leaderId,function(err,leader){
            if(err)console.log(err);
            leader.comments.push(req.body);

            leader.save(function(err,leader){
                if(err)console.log(err);
                res.json(leader);
            })
        })
    })

    .delete(function(req, res, next){
        Leaders.findById(req.params.leaderId,function(err,leader){
            if(err)console.log(err);
            for(i = leader.comments.length; i>=0;i--){
                leader.comments.id(leader.comments[i]._id).remove();
            }

            leader.save(function(err,result){
                if(err)console.log(err);
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('Deleted all comments');
            })
        })
    });

leadershipRouter.route('/:leaderId/comments/:commentId')

    .get(function(req,res,next){
        Leaders.findById((req.params.leaderId),function(err,leader){
            if(err)console.log("hllo" + err);
            else{
                //leader.comments.findById(req.param.commentId,function(err,comment){
                //    if(err)console.log('Error happened');
                //    else{
                //        res.json(comment);
                //    }
                //})
                //OR
                res.json(leader.commments.id(req.params.commentId));
            }
        })
    })

    .put(function(req, res, next){

        Leaders.findById(req.params.leaderId,function(err,leader){
            if(err)console.log(err);
            else{
                leader.comments.id(req.params.commentId).remove();
                leader.comments.push(req.body);
                leader.save(function(err,result){
                    if (err) console.log(err);
                    else{
                        res.writeHead(200,{'Content-Type':'text/plain'});
                        res.end('saved the comment');
                    }
                })
            }
        })
    })

    .delete(function(req, res, next){
        Leaders.findById(req.params.leaderId,function(err,leader){
            if(err)console.log(err);
            else{
                leader.comments.id(req.params.commentId).remove();
                leader.save(function(err,result){
                    if (err) console.log(err);
                    else{
                        res.writeHead(200,{'Content-Type':'text/plain'});
                        res.end('saved the comment');
                    }
                })
            }

        })
    });

module.exports = leadershipRouter;