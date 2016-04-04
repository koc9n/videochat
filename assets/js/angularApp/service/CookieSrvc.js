/**
 * Created by koc9n on 29.03.16.
 */
(function () {
  'use strict';
  var chatApp = angular.module('ChatApp', []);
  chatApp.service('CookieSrvc', ['$cookies', function ($cookies) {

    this.put = function (key, data) {
      $cookies.putObject(key, data);
    };

    this.get = function (key) {
      return $cookies.getObject(key);
    };

    this.isAuthenticated = function () {
      return $cookies.getObject('user') != null;
    }
  }]);
}());
