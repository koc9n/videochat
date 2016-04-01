/**
 * Created by koc9n on 3/31/16.
 */
(function () {

  'use strict';

  angular.module('ChatApp').controller('LogoutCtrl', ['$scope', '$rootScope', '$location', 'CookieSrvc',
    function ($scope, $rootScope, $location, CookieSrvc) {
      $rootScope.authenticated = false;
      CookieSrvc.put('user', null);
      $location.path('/');
    }])

}());
