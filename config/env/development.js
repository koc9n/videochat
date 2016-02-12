/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }
  port: 80,

  passport: {
    twitter: {
      name: 'Twitter',
      protocol: 'oauth',
      strategy: require('passport-twitter').Strategy,
      options: {
        consumerKey: 'unlTey7V2HCb93M2p7rGb6d6L',
        consumerSecret: 'rEnFfTC92uzuPbyTNOOzSozdbSNW9R5QEvSamuAtpY2MK9gFPg',
        callbackURL: 'http://coolapps.pp.ua/auth/twitter/callback'
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
        callbackURL: 'http://coolapps.pp.ua/auth/facebook/callback'
      }
    },

    vkontakte: {
      name: 'Vkontakte',
      protocol: 'oauth2',
      strategy: require('vkontakte-passport').Strategy,
      options: {
        clientID: '4551676',
        clientSecret: 'SgFGqj0oXyKWUDguQqAB',
        scope: ['email'],
        profileFields: ['screen_name','domain','photo_200_orig','sex','middle_name'],
        callbackURL: 'http://coolapps.pp.ua/auth/vkontakte/callback'
      }
    }
  }

};
