'use strict';

var app = require('../..');
import request from 'supertest';

var newHairdresser;

describe('Hairdresser API:', function() {

  describe('GET /api/hairdresser', function() {
    var hairdresser;

    beforeEach(function(done) {
      request(app)
        .get('/api/hairdresser')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          hairdresser = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(hairdresser).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/hairdresser', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/hairdresser')
        .send({
          name: 'New Hairdresser',
          info: 'This is the brand new hairdresser!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newHairdresser = res.body;
          done();
        });
    });

    it('should respond with the newly created hairdresser', function() {
      expect(newHairdresser.name).to.equal('New Hairdresser');
      expect(newHairdresser.info).to.equal('This is the brand new hairdresser!!!');
    });

  });

  describe('GET /api/hairdresser/:id', function() {
    var hairdresser;

    beforeEach(function(done) {
      request(app)
        .get('/api/hairdresser/' + newHairdresser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          hairdresser = res.body;
          done();
        });
    });

    afterEach(function() {
      hairdresser = {};
    });

    it('should respond with the requested hairdresser', function() {
      expect(hairdresser.name).to.equal('New Hairdresser');
      expect(hairdresser.info).to.equal('This is the brand new hairdresser!!!');
    });

  });

  describe('PUT /api/hairdresser/:id', function() {
    var updatedHairdresser;

    beforeEach(function(done) {
      request(app)
        .put('/api/hairdresser/' + newHairdresser._id)
        .send({
          name: 'Updated Hairdresser',
          info: 'This is the updated hairdresser!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHairdresser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHairdresser = {};
    });

    it('should respond with the updated hairdresser', function() {
      expect(updatedHairdresser.name).to.equal('Updated Hairdresser');
      expect(updatedHairdresser.info).to.equal('This is the updated hairdresser!!!');
    });

  });

  describe('DELETE /api/hairdresser/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/hairdresser/' + newHairdresser._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when hairdresser does not exist', function(done) {
      request(app)
        .delete('/api/hairdresser/' + newHairdresser._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
