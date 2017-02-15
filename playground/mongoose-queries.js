const {ObjectID}=require('mongodb');

const {mongoose}=require('../server/db/mongoose');
const {Todo}=require('../server/models/todo');

//58a480b1677cd130405edc75
var id='58a480b1677cd130405edc75';

 if(!ObjectID.isValid(id)){
   console.log('Id is not valid.');
 }

Todo.find({
  _id:id
}).then((todos)=>console.log('Todos: ',todos));

Todo.findOne({
  _id:id
}).then((todo)=>console.log('Todo: ',todo));

Todo.findById(id).then((todo)=>{
  if(!todo) return console.log('Id is not exist.');
  console.log('Todo by id: ',todo);
}).catch(e=>console.log(e));
