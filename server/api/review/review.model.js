'use strict';

import mongoose from 'mongoose';

var ReviewSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Review', ReviewSchema);
