/**
 * Reward model events
 */

'use strict';

import {EventEmitter} from 'events';
import Reward from './reward.model';
var RewardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RewardEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Reward.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RewardEvents.emit(event + ':' + doc._id, doc);
    RewardEvents.emit(event, doc);
  }
}

export default RewardEvents;
