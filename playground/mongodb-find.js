const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

//fetch all todos collection. find returns mongodb cursor.
// returned cursor has many functions such as toArray which return promise
  // db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },
  // (err)=>{
  //   console.log('Unable to fetch Todos.',err);
  // });

  db.collection('Todos').find().count().then((count)=>{
    console.log('Todos count: ',count);
  },
  (err)=>{
    console.log('Unable to fetch Todos.',err);
  });

  //db.close();
});
