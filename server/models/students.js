var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Student = new Schema (
  {
    name: String,
    age: Number,
    homeroom: String
  }
);

process.env.DB_HOST = 'mongodb://localhost/students';

mongoose.connect(process.env.DB_HOST);

module.exports = mongoose.model('students', Student);
