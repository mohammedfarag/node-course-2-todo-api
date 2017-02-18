const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose')
var {authenticate}=require('./middleware/authenticate');
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
    }).catch((e)=>{
      //error
      res.status(400).send();
    });
  });

//update todo
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  //pick(object,[array of properties we wanna to pull off if exist in object])
  //pick is to avoid to update any properties that we wouldn't (ex. completedAt)
  var body=_.pick(req.body,['text','completed']);
  //validate the id -> not valid? send 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }
  else {
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true})
  .then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  })
  .catch((e)=>{
    //error
    res.status(400).send();
  });
});

//Create user
app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user=new User(body);
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

// get users
app.get('/users',(req,res)=>{
  User.find().sort({_id:-1}).then((user)=>{
      res.send({user});
  },(e)=>{
    res.status(400).send(e);
  })
});

//example for private rout.
app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
})

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});
