/**
 * Hairdresser model events
 */

'use strict';

import {EventEmitter} from 'events';
import Hairdresser from './hairdresser.model';
var HairdresserEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HairdresserEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Hairdresser.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HairdresserEvents.emit(event + ':' + doc._id, doc);
    HairdresserEvents.emit(event, doc);
  }
}

export default HairdresserEvents;
