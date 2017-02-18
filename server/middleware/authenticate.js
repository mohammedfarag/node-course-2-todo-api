const express=require('express');
var {User}=require('../models/user')

//middlewar function that will be used in routes to make them private
var authenticate=(req,res,next)=>{
  var token=req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((e)=>{
    //authentication is required
    res.status(401).send();
  });
};
module.exports={authenticate};
