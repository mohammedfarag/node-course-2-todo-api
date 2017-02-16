var mongoose=require('mongoose');
// tell mongoose which promise lib would be used.
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports={mongoose};
