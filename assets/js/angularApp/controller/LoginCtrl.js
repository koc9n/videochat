/**
 * Created by koc9n on 23.02.16.
 */
(function () {

  'use strict';

  angular.module('ChatApp').controller('LoginCtrl', ['$scope', '$rootScope','$location', 'ToasterSrvc', 'HttpSrvc', 'CookieSrvc',
    function ($scope, $rootScope, $location, ToasterSrvc, HttpSrvc, CookieSrvc) {
    HttpSrvc.getProviders().then(function (response) {
      $scope.providers = response.data;
      $scope.loginProvider = function (url) {
        HttpSrvc.loginProvider(url).then(function (response) {
          console.log('success: ' + response.data);
          $scope.providers = response.data;
        }, function (reason) {
          console.log('error: ' + reason);
        });
      }
    }, function (reason) {
      console.log('error: ' + reason);
    });

    $scope.submit = function (usr) {
      HttpSrvc.login(usr).then(function (response) {
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
        console.log('error: ' + reason);
      });
    }

  }])

}())
