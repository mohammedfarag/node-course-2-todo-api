const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password='123abc!';
//  bcrypt.genSalt(10,(err,salt)=>{
// bcrypt.hash(password,salt,(err,res)=>console.log(res));
//  });

// hashedPassword='$2a$10$Z2GEWfwmpQxxrNVhk91VV.u2tzPzmChQU9rofqZKdbYisOEkKRhu2'
hashedPassword='$2a$10$w.nk.LH1Vs1UEYEr8g9YJOoVB4k72YRuaDlW3fVnKejMih6Z6iI/i';
//
bcrypt.compare(password,hashedPassword,(err,res)=>console.log(res));
// var data={id:10};
//
// var token=jwt.sign(data,'123abc');
// console.log(`token ${token}`);
//
// var decoded=jwt.verify(token,'123abc');
// console.log('decoded',decoded);

//code below is a semulation for JWT (that exactly what JWT do create token and verify it)
/*
var message='I am user number 3';
var hash=SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data={id:4};
var token={
  data,
  hash:SHA256(JSON.stringify(data)+'somesecret').toString()
};

//salt is add a value to hashed object to help identifying if data changed or not
//salt value 'somesecret' is on server so if pirate user changed the data value
// and tried to hash it again sure it will be equale the hashed data with salt on server.
var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();

// token.data.id=5;
// token.hash=SHA256(JSON.stringify(token.data)).toString();


if(resultHash===token.hash){
  console.log('Data was not changed');
}else {
  console.log('Data was changed don\'t trust!');
}
*/
