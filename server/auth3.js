'use strict'
const {User, OAuth} = require('APP/db')
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var router = require('express').Router()

passport.use('google', new GoogleStrategy({
  // authorizationURL: 'https://www.provider.com/oauth2/authorize',
  // tokenURL: 'https://www.provider.com/oauth2/token',
  clientID: '306912746021-vbc1bid56r146ttg8vpvdtrfrlg3rbl2.apps.googleusercontent.com',
  clientSecret: 'yATjgOWEHOJiR86S785T-sU1',
  callbackURL: '/api/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    where: {
      googleId: profile.id
    },
    defaults: {
      email: profile.emails[0].value,
      name: profile.displayName,
      photo: profile.photos ? profile.photos[0].value : undefined
    }
  })
  .spread(user => {
    done(null, user)
  })
  .catch(done)
})
)

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
router.get('/auth/google',
passport.authenticate('google', { scope: 'email' })
)

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/',
    failureRedirect: '/login' }))
