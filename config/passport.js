/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  bearer: {
    strategy: require('passport-http-bearer').Strategy
  },

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'unlTey7V2HCb93M2p7rGb6d6L',
      consumerSecret: 'rEnFfTC92uzuPbyTNOOzSozdbSNW9R5QEvSamuAtpY2MK9gFPg',
      callbackURL: 'http://192.168.0.111/auth/facebook/callback'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '1639063506338417',
      clientSecret: '44a8b714f21bdf1896bb2840f832ab6f',
      scope: ['email'],
      profileFields: ['id', 'displayName', 'link', 'photos', 'email'],
      callbackURL: 'http://192.168.0.111/auth/facebook/callback'
    }
  },

  vkontakte: {
    name: 'Vkontakte',
    protocol: 'oauth2',
    strategy: require('vkontakte-passport').Strategy,
    options: {
      clientID: sail.config.vk.apiId || '4551676',
      clientSecret: 'SgFGqj0oXyKWUDguQqAB',
      scope: ['email'],
      profileFields: ['screen_name','domain','photo_200_orig','sex','middle_name'],
      callbackURL: 'http://192.168.0.111/auth/vkontakte/callback'
    }
  }
/*
  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    }
  },

  cas: {
    name: 'CAS',
    protocol: 'cas',
    strategy: require('passport-cas').Strategy,
    options: {
      ssoBaseURL: 'http://your-cas-url',
      serverBaseURL: 'http://localhost:1337',
      serviceURL: 'http://localhost:1337/auth/cas/callback'
    }
  }*/
};
