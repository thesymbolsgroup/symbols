'use strict';

import mongoose from 'mongoose';

var HairdresserSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Hairdresser', HairdresserSchema);
