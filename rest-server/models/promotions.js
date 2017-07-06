/**
 * Created by Gerry Hanjra on 7/5/2017.
 */
/**
 * Created by Gerry Hanjra on 7/5/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

var commentSchema = new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
},{timestamps:true});

var promoSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:mongoose.Types.Currency,
        required:true
    },
    comments:[commentSchema]}, {
    timestamps:true
});

var promo = mongoose.model('promo',promoSchema);
module.exports = promo;