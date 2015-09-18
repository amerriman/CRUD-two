var express = require('express');
var router = express.Router();
var Student = require('../models/students');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get all students

router.get('/students', function(req, res, next){
  Student.find(function(err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//get one student
router.get('/student/:id', function(req, res, next){
  Student.findById(req.params.id, function (err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//post students
router.post('/students', function(req, res){
  newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
    homeroom: req.body.homeroom
  });
  newStudent.save(function (err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json({'SUCCESS': data});
    }
  });
});

//put one student
router.put('/student/:id', function(req, res){
  var update = {
    name: req.body.name,
    age: req.body.age,
    homeroom: req.body.homeroom
  };
  Student.findByIdAndUpdate(req.params.id, update, function (err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//delete one student
router.delete('/student/:id', function(req, res){
  Student.findByIdAndRemove(req.params.id, function (err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
