process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Student = require("../server/models/students");
//do I need a plural students

var should = chai.should();
chai.use(chaiHttp);

describe('Students', function() {

  Student.collection.drop();

  beforeEach(function(done){
    var newStudent = new Student({
      name: 'Frank',
      age: 10,
      homeroom: 'Kerns'
    });
    newStudent.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Student.collection.drop();
    done();
  });

//Check GET all students route
  it('should list ALL students on /students GET', function(done){
    chai.request(server)
    .get('/students')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('age');
      res.body[0].should.have.property('homeroom');
      res.body[0].name.should.equal('Frank');
      res.body[0].age.should.equal(10);
      res.body[0].homeroom.should.equal("Kerns");
      done();
    });
  });

//check POST student route
  it('should add a SINGLE student on /students POST', function(done) {
  chai.request(server)
    .post('/students')
    .send({'name': 'Karen', 'age': 12, 'homeroom': 'Merriman'})
    .end(function(err, res){
      console.log(res.body, "res.body");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('age');
      res.body.SUCCESS.should.have.property('homeroom');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Karen');
      res.body.SUCCESS.age.should.equal(12);
      res.body.SUCCESS.homeroom.should.equal('Merriman');
      done();
    });
});


  // it('should add a SINGLE student on /students POST');


  // it('should update a SINGLE student on /student/<id> PUT');


  // it('should delete a SINGLE student on /student/<id> DELETE');
});
