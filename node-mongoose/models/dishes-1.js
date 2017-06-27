/**
 * Created by Gerry Hanjra on 6/27/2017.
 */

var mongoose = require('mongoose')
var Schema  = mongoose.Schema;

var dishSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }}, {
    timestamps:true
    });

var dishes = mongoose.model('dish',dishSchema);

module.exports = dishes;