'use strict';

var app = require('../..');
import request from 'supertest';

var newBooking;

describe('Booking API:', function() {

  describe('GET /api/bookings', function() {
    var bookings;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(bookings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/bookings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bookings')
        .send({
          bookingCreationtime: '2016-07-07T15:06:00.000Z',
          startTime: '2016-07-07T15:06:00.000Z',
          endTime: '2016-07-07T15:06:00.000Z',
          bookingState: 'pending',
          price: 20,
            address: {
                country: 'United Kingdom',
                lineOne: 'London Road',
                lineTwo: 'Flat 5',
                city: 'London',
                county: 'London',
                postcode: 'SW6 3ER',
            }

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
      expect(newBooking.bookingCreationtime).to.equal('2016-07-07T15:06:00.000Z');
      expect(newBooking.startTime).to.equal('2016-07-07T15:06:00.000Z');
      expect(newBooking.endTime).to.equal('2016-07-07T15:06:00.000Z');
      expect(newBooking.bookingState).to.equal('pending');
      expect(newBooking.price).to.equal(20);
      expect(newBooking.address.country).to.equal('United Kingdom'); 
    });

  });

  describe('GET /api/bookings/:id', function() {
    var booking;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookings/' + newBooking._id)
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
          expect(newBooking.address.country).to.equal('United Kingdom');
    });

  });

  describe('PUT /api/bookings/:id', function() {
    var updatedBooking;

    beforeEach(function(done) {
      request(app)
        .put('/api/bookings/' + newBooking._id)
        .send({
          bookingCreationtime: '2016-07-07T15:06:00.000Z',
          startTime: '2016-07-07T15:06:00.000Z',
          endTime: '2016-07-07T15:06:00.000Z',
          bookingState: 'pending',
          price: 20,
            address: {
                country: 'United Kingdom',
                lineOne: 'London Road',
                lineTwo: 'Flat 5',
                city: 'London',
                county: 'London',
                postcode: 'SW6 3ER',
            }
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
        expect(newBooking.bookingCreationtime).to.equal('2016-07-07T15:06:00.000Z');
      expect(newBooking.startTime).to.equal('2016-07-07T15:06:00.000Z');
      expect(newBooking.endTime).to.equal('2016-07-07T15:06:00.000Z');
      expect(newBooking.bookingState).to.equal('pending');
      expect(newBooking.price).to.equal(20);
      expect(newBooking.address.country).to.equal('United Kingdom');
    });

  });

  describe('DELETE /api/bookings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bookings/' + newBooking._id)
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
        .delete('/api/bookings/' + newBooking._id)
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
