'use strict';

var app = require('../..');
import request from 'supertest';

var newBooking;

describe('Booking API:', function() {

  describe('GET /api/booking', function() {
    var booking;

    beforeEach(function(done) {
      request(app)
        .get('/api/booking')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          booking = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(booking).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/booking', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/booking')
        .send({
          name: 'New Booking',
          info: 'This is the brand new booking!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBooking = res.body;
          done();
        });
    });

    it('should respond with the newly created booking', function() {
      expect(newBooking.name).to.equal('New Booking');
      expect(newBooking.info).to.equal('This is the brand new booking!!!');
    });

  });

  describe('GET /api/booking/:id', function() {
    var booking;

    beforeEach(function(done) {
      request(app)
        .get('/api/booking/' + newBooking._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          booking = res.body;
          done();
        });
    });

    afterEach(function() {
      booking = {};
    });

    it('should respond with the requested booking', function() {
      expect(booking.name).to.equal('New Booking');
      expect(booking.info).to.equal('This is the brand new booking!!!');
    });

  });

  describe('PUT /api/booking/:id', function() {
    var updatedBooking;

    beforeEach(function(done) {
      request(app)
        .put('/api/booking/' + newBooking._id)
        .send({
          name: 'Updated Booking',
          info: 'This is the updated booking!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBooking = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBooking = {};
    });

    it('should respond with the updated booking', function() {
      expect(updatedBooking.name).to.equal('Updated Booking');
      expect(updatedBooking.info).to.equal('This is the updated booking!!!');
    });

  });

  describe('DELETE /api/booking/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/booking/' + newBooking._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when booking does not exist', function(done) {
      request(app)
        .delete('/api/booking/' + newBooking._id)
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
