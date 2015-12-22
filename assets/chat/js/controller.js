/**
 * Created by k.mironchik on 9/17/2014.
 */
var myApp = angular.module('ChatApp', []);

myApp.controller('ChatController', ['$scope', function ($scope) {
  io.sails.transports = ['websocket'];
  var socket = io.sails.connect();
  socket.get('/chat/init');

  /**
   * Info about socket connection
   */
  socket.on("connect", function () {
    console.log('Chat socket has been connected successfully.');
  });

  /**
   * Action by init of chat
   */
  socket.on("init", function (msg) {
    if (msg) {
      for (var i in msg) {
        $scope.pushToMessages(msg[i]);
      }
      $scope.$apply();
    }
  });

  /**
   * Receiving messages
   */
  socket.on("chat", function onServerSentEvent(msg) {
    $scope.pushToMessages(msg);
    $scope.$apply();
  });

  $scope.messageArr = [];
  $scope.memberArr = [];

  $scope.sendData = function () {
    if($scope.messageTxt.trim() != "") {
      socket.post('/chat/init', {message: $scope.messageTxt});
      $scope.messageTxt = "";
    }
  }

  $scope.pushToMessages = function (item) {
    $scope.messageArr.unshift({
      text: item.message,
      user: item.user
    });
  };

  $scope.pushToMembers = function (item) {
    $scope.memberArr.unshift({
      nick: item.nick,
      photoUrl: item.photoUrl,
      firstName: item.firstName,
      lastName: item.lastName
    });
  };
}]);

myApp.directive('ngEnter', function () {
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
