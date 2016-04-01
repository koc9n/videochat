/**
 * Created by koc9n on 21.03.16.
 */
(function () {

  'use strict';

  angular.module('ChatApp').controller('RegisterCtrl',
    ['$rootScope', '$scope', 'ToasterSrvc', 'HttpSrvc', 'CookieSrvc',
      function ($rootScope, $scope, ToasterSrvc, HttpSrvc, CookieSrvc) {
        HttpSrvc.getProviders().then(function (response) {
          $scope.providers = response.data;
        }, function (reason) {
          console.log('error' + reason);
        });


        $scope.submit = function (usr) {
          HttpSrvc.register(usr).then(function (response) {
            console.log('success: ' + response.data);
            if (response.data.error) {
              ToasterSrvc.toastError(response.data.error);
            } else {
              ToasterSrvc.toastSuccess(response.data.user.username || response.data.user.email);
              CookieSrvc.put('user', response.data.user);
              $rootScope.authenticated = true;
              $location.path('/');
            }
          }, function (reason) {
            console.log('error' + reason);
          });
        }
      }])

}());
