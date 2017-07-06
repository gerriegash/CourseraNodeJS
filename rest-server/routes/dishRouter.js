/**
 * Created by Gerry Hanjra on 6/26/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(function(req,res,next){
        Dishes.find({},function(err,dish){
            if(err)console.log(err);
            else res.json(dish);
        })
    })

    .post(function(req, res, next){
        Dishes.create(req.body,function(err,result){
            if(err)console.log(err)
            else {
                res.writeHead(200,{'Content-Type':'text-plain'})
                res.end('we created dish with id '+ result._id)};
        })
    })

    .delete(function(req, res, next){
        Dishes.remove({},function(err,result){
            if (err)console.log(err);
            else res.json(result);
        })
    });

dishRouter.route('/:dishId')

    .get(function(req,res,next){
        Dishes.findById((req.params.dishId),function(err,dish){
            if(err)console.log(err);
            else res.json(dish);
        })
    })

    .put(function(req, res, next){
        Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true},function(err,result){
            if(err)console.log(err)
            else res.json(result);
        })
    })

    .delete(function(req, res, next){
        Dishes.findByIdAndRemove(req.params.dishId,function(err,result){
            if (err)console.log(err);
            else res.json(result);
        })
    });

dishRouter.route('/:dishId/comments')

    .get(function(req,res,next){
        Dishes.find({},function(err,dish){
            if(err)console.log(err);
            else
                res.json(dish[0].comments);
            console.log((dish));
        })
    })

    .post(function(req, res, next){
        Dishes.findById(req.params.dishId,function(err,dish){
            if(err)console.log(err);
            dish.comments.push(req.body);

            dish.save(function(err,dish){
                if(err)console.log(err);
                res.json(dish);
            })
        })
    })

    .delete(function(req, res, next){
        Dishes.findById(req.params.dishId,function(err,dish){
            if(err)console.log(err);
            for(i = dish.comments.length; i>=0;i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }

            dish.save(function(err,result){
                if(err)console.log(err);
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('Deleted all comments');
            })
        })
    });

dishRouter.route('/:dishId/comments/:commentId')

    .get(function(req,res,next){
        Dishes.findById((req.params.dishId),function(err,dish){
            if(err)console.log("hllo" + err);
            else{
                //dish.comments.findById(req.param.commentId,function(err,comment){
                //    if(err)console.log('Error happened');
                //    else{
                //        res.json(comment);
                //    }
                //})
                //OR
                res.json(dish.commments.id(req.params.commentId));
            }
        })
    })

    .put(function(req, res, next){

        Dishes.findById(req.params.dishId,function(err,dish){
            if(err)console.log(err);
            else{
                dish.comments.id(req.params.commentId).remove();
                dish.comments.push(req.body);
                dish.save(function(err,result){
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
        Dishes.findById(req.params.dishId,function(err,dish){
            if(err)console.log(err);
            else{
                dish.comments.id(req.params.commentId).remove();
                dish.save(function(err,result){
                    if (err) console.log(err);
                    else{
                        res.writeHead(200,{'Content-Type':'text/plain'});
                        res.end('saved the comment');
                    }
                })
            }

        })
    });

module.exports = dishRouter;