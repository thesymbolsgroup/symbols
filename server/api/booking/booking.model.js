'use strict';

import mongoose from 'mongoose';

var BookingSchema = new mongoose.Schema({
  name: String,
  time: Date,
  startTime: Date,
  endTime: Date,
  bookingState: String,
  address: String,
    
  info: String,
  active: Boolean
});

export default mongoose.model('Booking', BookingSchema);
