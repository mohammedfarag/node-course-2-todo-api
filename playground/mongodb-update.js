const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('Todos').findOneAndUpdate(
    {_id:new ObjectID('58a453ff670a58514bf41610')},
    {$set:{completed:true}},
    {returnOriginal:false}
  ).then((res)=>{
    console.log(res);
  });



  db.collection('Users').findOneAndUpdate(
    {_id:new ObjectID('58a450d8670a58514bf415b7')},
    {$set:{name:'Mohammed Fathy'}, $inc:{age:1}},
    {returnOriginal:false}
  ).then((res)=>{
    console.log(res);
  });


  //db.close();
});
