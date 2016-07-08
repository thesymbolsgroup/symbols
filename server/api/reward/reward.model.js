'use strict';

import mongoose from 'mongoose';

var RewardSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Reward', RewardSchema);
