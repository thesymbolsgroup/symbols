/**
 * Salon model events
 */

'use strict';

import {EventEmitter} from 'events';
import Salon from './salon.model';
var SalonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SalonEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Salon.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SalonEvents.emit(event + ':' + doc._id, doc);
    SalonEvents.emit(event, doc);
  }
}

export default SalonEvents;
