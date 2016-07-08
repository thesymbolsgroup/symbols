import passport from 'passport';
//var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//var User = mongoose.model('User');

import User from '../../api/user/user.model';

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }).exec()
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

	passport.use(new FacebookStrategy({
		clientID: '2054447374780894',
		clientSecret: 'b29504bb1613f3c8ae2baac1694cbc50',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
    	profile.authOrigin = 'facebook';
    	User.findOrCreateOAuthUser(profile, function (err, user) {
	      return done(err, user);
	    });
    }));

export function setup(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
