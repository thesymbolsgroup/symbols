'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'test3-secret',

  FACEBOOK_ID:      '2054447374780894',
  FACEBOOK_SECRET:  'b29504bb1613f3c8ae2baac1694cbc50',

  GOOGLE_ID: '415326202032-uivtii7aedd32m4pihq72ai1for25u36.apps.googleusercontent.com',
  GOOGLE_SECRET:    'ct0Xz-oYEksVD9qgG5OBFsbF',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
