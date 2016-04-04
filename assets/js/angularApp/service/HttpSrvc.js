/**
 * Created by koc9n on 21.02.16.
 */
(function () {
  'use strict';
  var chatApp = angular.module('ChatApp', []);
  chatApp.service('HttpSrvc', ['$http', function ($http) {

    this.getProviders = function () {
      return $http.get('/providers');
    };

    this.register = function (data) {
      return $http.put('/auth/local/register', data);
    };

    this.login = function (data) {
      return $http.post('/auth/local', data);
    };

    this.loginProvider = function (url) {
      return $http.jsonp(url);
    };


  }]);
}())
