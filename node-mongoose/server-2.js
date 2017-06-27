/**
 * Created by Gerry Hanjra on 6/27/2017.
 */

var mongoose = require('mongoose');
var dishes = require('./models/dishes-1');
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
        name: "Uthapizzza",
        description: "Some description"
    }),function(err,dish){
        console.log(dish);
        var id = dish._id;

        dishes.findByIdAndUpdate(id,{
                $set:{
                    description:"updated one!!"}
            }
            ,{new:true}
            ,function(err,dish){
                console.log(dish);
                db.collection('dishes').drop(function(){
                    db.close();
                })
            })
    })



});