import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails',
      'gender'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id}).exec()
      .then(user => {
        if (user) {
          console.log(user);
          return done(null, user);
            
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          gender: profile.gender,
          provider: 'facebook',
          facebook: profile._json
        });
        user.save()
          .then(user => done(null, user))
          .catch(err => done(err));
        
        console.log(user);
      })
      .catch(err => done(err));
  }));
}
