/**
 * Created by koc9n on 21.02.16.
 */
(function () {

  'use strict';

  angular.module('ChatApp').controller('ChatCtrl', ['$scope', function ($scope) {
    io.sails.autoConnect = false;
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
        for (var i = 0; i < msg.length; i++) {
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

    $scope.sendData = function () {
      if ($scope.messageTxt.trim() != "") {
        socket.post('/chat/init', {message: $scope.messageTxt});
        $scope.messageTxt = "";
      }
    };

    $scope.pushToMessages = function (item) {
      $scope.messageArr.unshift(item);
    };
  }])
}())
