'use strict';

var app = require('../..');
import request from 'supertest';

var newSalon;

describe('Salon API:', function() {

  describe('GET /api/salons', function() {
    var salons;

    beforeEach(function(done) {
      request(app)
        .get('/api/salons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          salons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(salons).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/salons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/salons')
        .send({
          name: 'New Salon',
          info: 'This is the brand new salon!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSalon = res.body;
          done();
        });
    });

    it('should respond with the newly created salon', function() {
      expect(newSalon.name).to.equal('New Salon');
      expect(newSalon.info).to.equal('This is the brand new salon!!!');
    });

  });

  describe('GET /api/salons/:id', function() {
    var salon;

    beforeEach(function(done) {
      request(app)
        .get('/api/salons/' + newSalon._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          salon = res.body;
          done();
        });
    });

    afterEach(function() {
      salon = {};
    });

    it('should respond with the requested salon', function() {
      expect(salon.name).to.equal('New Salon');
      expect(salon.info).to.equal('This is the brand new salon!!!');
    });

  });

  describe('PUT /api/salons/:id', function() {
    var updatedSalon;

    beforeEach(function(done) {
      request(app)
        .put('/api/salons/' + newSalon._id)
        .send({
          name: 'Updated Salon',
          info: 'This is the updated salon!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSalon = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSalon = {};
    });

    it('should respond with the updated salon', function() {
      expect(updatedSalon.name).to.equal('Updated Salon');
      expect(updatedSalon.info).to.equal('This is the updated salon!!!');
    });

  });

  describe('DELETE /api/salons/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/salons/' + newSalon._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when salon does not exist', function(done) {
      request(app)
        .delete('/api/salons/' + newSalon._id)
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
