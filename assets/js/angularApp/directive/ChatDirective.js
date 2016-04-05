/**
 * Created by koc9n on 22.02.16.
 */
(function() {
  'use strict';
  angular.module('ChatApp').directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });
}());
