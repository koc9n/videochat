/**
 * Created by kos on 24.09.2014.
 */

var enteredUser = null;



function sendData() {
  var messageEl = document.getElementById('messageInput');
  var messageObj = {sender: enteredUser, text: messageEl.value, recipients: []};
  Chat.socket.send(angular.toJson(messageObj));
  messageEl.value = "";
}

function initChat(response) {
  if (response.session) {
    if (enteredUser == null) {
      VK.Api.call('users.get', {uids: response.session.mid, fields: "screen_name,photo_200_orig"}, function (r) {
        if (r.response) {
          io.sails.transports=['websocket'];
          var socket = io.sails.connect();
          socket.on("connect", function () {
            console.log(sock);
            var el = document.getElementsByClassName('ng-scope')[1];
            var scope = angular.element(el).scope();
            scope.pushToMessages(msg.verb);
            scope.$apply();
          });
          socket.on("order", function onServerSentEvent(msg) {
            var el = document.getElementsByClassName('ng-scope')[1];
            var scope = angular.element(el).scope();
            scope.pushToMessages(msg.verb);
            scope.$apply();
          });
        }
      });
    }
  }
}

function authInfo(response) {
  initChat(response);
}

VK.init({
  apiId: 4551676
});

VK.Auth.login(authInfo);
