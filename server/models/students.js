var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Student = new Schema (
  {
    name: String,
    age: Number,
    homeroom: String
  }
);

// process.env.DB_HOST = 'mongodb://localhost/students';

// mongoose.connect(process.env.DB_HOST);

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://heroku_t7snxzxg:3sjcp0ebmekfeg2m4fk1a8bb0e@ds041613.mongolab.com:41613/heroku_t7snxzxg");

module.exports = mongoose.model('students', Student);
