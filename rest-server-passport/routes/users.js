var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('../verify');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  User.get(Verify.verifyAdmin,{},function(err,Users){
    if(err){
      res.statusCode = 403;
      console.log("Error occured while retrieving users");
      next(err);
    }else{
      res.statusCode = 200;
      res.json(Users);
    }
  })
});

router.post('/register',function(req,res){
  User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    if(err){
      res.status(500).json({err:err});
    }

    if(req.body.firstName){
      user.firstName = req.body.firstName;
    }

    if(req.body.lastName){
      user.lastName = req.body.lastName;
    }
    user.save(function(err,user){
      passport.authenticate('local')(req,res,function(){
        return res.status(200).json({status:'registration sicuccessffuull.'})
      })
    })



  })
  }
)

router.post('/login',function(req,res,next){
  passport.authenticate('local',function(err,user,info){
    if(err){
      return next(err);
    }
    if(!user){
      return res.status(401).json({
        err:info
      })
    }
    req.logIn(user,function(err){
      if(err){
        return res.status(500).json({
          err:'COuld not find user'
        })
      }
      console.log('SUr in users:' + user);

      var token = Verify.getToken(user);

      res.status(200).json({status:'Login successful',success:'true',token:token})
    });
  })(req,res,next);
})

router.get('./logout',function(req,res){
    req.logout();
  res.status(200).json({sucess:'Logout sucess ful  === true'})
})

module.exports = router;
