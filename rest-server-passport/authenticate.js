/**
 * Created by Gerry Hanjra on 7/16/2017.
 */
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var config = require('./config');
var facebookStrategy = require('passport-facebook').Strategy;


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serlializeUser());
passport.deserializeUser(User.deserlializeUser());

exports.facebook =passport.use(new facebookStrategy({
    clientId: config.facebook.clientID,
    clientSecret:config.facebook.clientSecret,
    callbackUrl:config.facebook.callbackUrl
},
function(accessToken,refreshToken,profile,done){
    User.findOne({oAuthId:profile.id},function(err,User){
        if(err){
            console.log(err);
        }
        if(!err && user!==null){
            done(null,user);
        } else{
            user = new User({
                username:profile.displayName
            });
            user.oAuthId = profile.id;
            user.oAuthToken = accessToken;
            user.save(function(err,user){
                if(err){
                    console.log(err);
                } else{
                    console.log('saving user' +user);
                    done(null,user);
                }
            })
        }
    })
}))