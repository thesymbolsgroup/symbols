'use strict';

import mongoose from 'mongoose';

var BookingSchema = new mongoose.Schema({
  bookingCreationtime: Date,
  startTime: Date,
  endTime: Date,
  bookingState: String,
  price: Number,
  address: {
      country: String,
      lineOne: String,
      lineTwo: String,
      city: String,
      county: String,
      postcode: String,
  }
});

//additionalComments: String

export default mongoose.model('Booking', BookingSchema);
