/**
 * Created by Gerry Hanjra on 6/27/2017.
 */

var mongoose = require('mongoose');
var dishes = require('./models/dishes');
var assert= require('assert');

var url = "mongodb://localhost:27017";

mongoose.connect(url);
var db = mongoose.connection;

db.on('error',function(err){
    assert.equal(err,null);
    console.log("Connection error" +err);
});

db.once('open',function(err){
    assert.equal(null,err);
    console.log("Connection Established");

    dishes.create(({
        name: "Uta12pizzza",
        description: "323ome description",
        image:'I dnt know the pah to this image',
        price:'100000',
        category:'Some categry'
        ,
        comments:[{
          rating:5,
            comment:'this is insane',
            author:'Matt Daemon'
        }]
    }),function(err,dish){
        console.log( "On creation" +dish);
        var id = dish._id;

        dishes.findByIdAndUpdate(id,{
                $set:{
                    description:"updated one!!"}
            }
            ,{new:true}).exec(function(err,dish){
                if (err)throw err;
                console.log(dish);

                dish.comments.push({
                    rating:5,
                    comment:'this is insane 1',
                    author:'Matt Daemon 2'
                });

                dish.save(function(err,dish){
                    console.log("We added the comments");
                    db.collection('dishes').drop(function(){
                      db.close();
                    })
                })
         })
    })
});