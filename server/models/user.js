const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');

var UserSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:5,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a vlid email.'
    }
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      require:true
    },
    token:{
      type:String,
      require:true
    }
  }]
});

UserSchema.methods.toJSON=function(){
  return _.pick(this,['_id','email']);
};
UserSchema.methods.generateAuthToken=function(){
  var access='auth';
  var token=jwt.sign({_id:this._id.toHexString(),access},'abc123').toString();
  this.tokens.push({access,token});
  return this.save().then(()=>token);
};
UserSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try{
    decoded=jwt.verify(token,'abc123');
  }
  catch(e){
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject();
  }
  var yup= User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
  return yup;
};

var User=mongoose.model('User',UserSchema);
module.exports = {User};
