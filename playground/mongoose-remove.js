const {ObjectID}=require('mongodb');

const {mongoose}=require('../server/db/mongoose');
const {Todo}=require('../server/models/todo');
const {User}=require('../server/models/user');

// remove with empty object will remove all items
// Todo.remove({}).then((result)=>{
// console.log(result);
// },(e)=>{
//
// });

// Todo.findOneAndRemove() retuen the doc
// Todo.findByIdAndRemove() retuen the doc
Todo.findOneAndRemove({_id:'58a56c8c30c054f15c559f56'}).then((todo)=>{
console.log(todo);
});

Todo.findByIdAndRemove('58a56c8c30c054f15c559f56').then((todo)=>{
console.log(todo);
});
