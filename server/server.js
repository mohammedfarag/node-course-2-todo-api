const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose')
var {Todo}=require('./models/todo')
var {User}=require('./models/user')

var port=process.env.port || 3000;

var app=express();

app.use(bodyParser.json());

//Create todo
app.post('/todos',(req,res)=>{
  var todo=new Todo({text:req.body.text})
  todo.save().then((doc)=>{
      res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
});

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});
