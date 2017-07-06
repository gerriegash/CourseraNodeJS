/**
 * Created by Gerry Hanjra on 6/26/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promos = require('../models/promoes');

var promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
    .get(function(req,res,next){
        Promos.find({},function(err,promo){
            if(err)console.log(err);
            else res.json(promo);
        })
    })

    .post(function(req, res, next){
        Promos.create(req.body,function(err,result){
            if(err)console.log(err)
            else {
                res.writeHead(200,{'Content-Type':'text-plain'})
                res.end('we created promo with id '+ result._id)};
        })
    })

    .delete(function(req, res, next){
        Promos.remove({},function(err,result){
            if (err)console.log(err);
            else res.json(result);
        })
    });

promotionsRouter.route('/:promoId')

    .get(function(req,res,next){
        Promos.findById((req.params.promoId),function(err,promo){
            if(err)console.log(err);
            else res.json(promo);
        })
    })

    .put(function(req, res, next){
        Promos.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true},function(err,result){
            if(err)console.log(err)
            else res.json(result);
        })
    })

    .delete(function(req, res, next){
        Promos.findByIdAndRemove(req.params.promoId,function(err,result){
            if (err)console.log(err);
            else res.json(result);
        })
    });

promotionsRouter.route('/:promoId/comments')

    .get(function(req,res,next){
        Promos.find({},function(err,promo){
            if(err)console.log(err);
            else
                res.json(promo[0].comments);
            console.log((promo));
        })
    })

    .post(function(req, res, next){
        Promos.findById(req.params.promoId,function(err,promo){
            if(err)console.log(err);
            promo.comments.push(req.body);

            promo.save(function(err,promo){
                if(err)console.log(err);
                res.json(promo);
            })
        })
    })

    .delete(function(req, res, next){
        Promos.findById(req.params.promoId,function(err,promo){
            if(err)console.log(err);
            for(i = promo.comments.length; i>=0;i--){
                promo.comments.id(promo.comments[i]._id).remove();
            }

            promo.save(function(err,result){
                if(err)console.log(err);
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('Deleted all comments');
            })
        })
    });

promotionsRouter.route('/:promoId/comments/:commentId')

    .get(function(req,res,next){
        Promos.findById((req.params.promoId),function(err,promo){
            if(err)console.log("hllo" + err);
            else{
                //promo.comments.findById(req.param.commentId,function(err,comment){
                //    if(err)console.log('Error happened');
                //    else{
                //        res.json(comment);
                //    }
                //})
                //OR
                res.json(promo.commments.id(req.params.commentId));
            }
        })
    })

    .put(function(req, res, next){

        Promos.findById(req.params.promoId,function(err,promo){
            if(err)console.log(err);
            else{
                promo.comments.id(req.params.commentId).remove();
                promo.comments.push(req.body);
                promo.save(function(err,result){
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
        Promos.findById(req.params.promoId,function(err,promo){
            if(err)console.log(err);
            else{
                promo.comments.id(req.params.commentId).remove();
                promo.save(function(err,result){
                    if (err) console.log(err);
                    else{
                        res.writeHead(200,{'Content-Type':'text/plain'});
                        res.end('saved the comment');
                    }
                })
            }

        })
    });

module.exports = promotionsRouter;