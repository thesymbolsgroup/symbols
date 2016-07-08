/**
 * Main application routes
 */

'use strict';


import errors from './components/errors';
import path from 'path';
import passport from 'passport';

export default function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/hairdressers', require('./api/hairdresser'));
  app.use('/api/bookings', require('./api/booking'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/salons', require('./api/salon'));
  app.use('/api/rewards', require('./api/reward'));
  app.use('/api/messages', require('./api/message'));
  


  app.use('/auth', require('./auth').default);
    
    
    


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
    
 	app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
	app.get("/auth/facebook/callback", 
		passport.authenticate("facebook",{ failureRedirect: '/login'}),
		function(req,res){
			res.render("profile", {user : req.user});
		}
	);
}
