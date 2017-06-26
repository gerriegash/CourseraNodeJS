/**
 * Created by Gerry Hanjra on 6/26/2017.
 */
var mongodb = require('mongodb').MongoClient,
    assert= require('assert');

//Connection url
var url = 'mongodb://localhost:27017/conFusion';

// We will always see the functions with callbacks below in mongoDB application as they re db opration
// and may take time to complete, so once they
// complete they will send a callback to indicate the status.

//Connect through MONGOCLIENT
mongodb.connect(url,function(err,db){
    console.log(err);
    console.log("Connection to database established.");

    var collection = db.collection('dishes');

    //Insert a document into collection
    collection.insertOne({name:"Uthapizza",description:"test"},function(err,result){
        assert.equal(err,null);
        console.log("after Insert");
        console.log(result.ops);

        // We want to uery for all of documents in this collection ater the insert operation so putting
        // the second find operation in this callback.
        collection.find({}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Docs found");
            console.log(docs);
        })
        db.dropCollection("dishes",function(err){
            assert.equal(err,null);
            console.log("collection: Dishes dropped!");
            db.close();
        })
    });





})