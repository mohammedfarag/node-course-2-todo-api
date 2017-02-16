const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose')
var {Todo}=require('./models/todo')
var {User}=require('./models/user')

var port=process.env.PORT || 3000;

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

//fetch all todos
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
      res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

//fetch todos by id
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  },(e)=>{
    res.status(400).send();
  })
});

//delete todo
app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  //validate the id -> not valid? send 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
//remove todo by id
  Todo.findByIdAndRemove(id).then((todo)=>{
//success
//if no document send 404
    if(!todo){
      return res.status(404).send();
    }
    //if doc, dend doc back with 200
    res.send({todo});
  },(e)=>{
    //error
    res.status(400).send();
  })
});

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});
