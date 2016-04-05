/**
 * Created by koc9n on 23.02.16.
 */
(function () {

  'use strict';

  angular.module('ChatApp').controller('HomeCtrl', ['$scope', 'CookieSrvc', function ($scope, CookieSrvc) {
    $scope.user = CookieSrvc.get('user');
  }])

}())
