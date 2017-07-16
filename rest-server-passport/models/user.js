/**
 * Created by Gerry Hanjra on 7/13/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User  = new Schema({
    user:String,
    password:String,
    oAuthId:String,
    oAuthToken:String,
        admin:{
            type:Boolean,
            default:false
        },
    firstName:String,
    lastName:String
})

User.methods.getName = function(){
    return this.firstName + '' + this.lastName;
}

User.plugin(passportLocalMongoose);
module.exports= mongoose.model('User',User);