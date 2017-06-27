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

    var newDish = dishes({
        name: "Uthapizzza1123",
        description: "Some de223scription1"
    });
    newDish.save(function(err){
        assert.equal(err,null);
        console.log("new dish saved");

        dishes.find({},function(err,dishes){
            assert.equal(err,null);
            console.log(dishes);
        });

    });


});