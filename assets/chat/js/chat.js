/**
 * Created by kos on 24.09.2014.
 */

function sendData() {
  var messageEl = document.getElementById('messageInput');
  var messageObj = {message: messageEl.value};
  socket.post('/chat/init', messageObj);
  messageEl.value = "";
}

function initChat() {
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
    var el = document.getElementsByClassName('ng-scope')[1];
    var scope = angular.element(el).scope();
    for (var i in msg){
      scope.pushToMessages(msg[i]);
    }
    scope.$apply();
  });

  /**
   * Receiving messages
   */
  socket.on("chat", function onServerSentEvent(msg) {
    var el = document.getElementsByClassName('ng-scope')[1];
    var scope = angular.element(el).scope();
    scope.pushToMessages(msg);
    scope.$apply();
  });

  return socket;
}

var socket = initChat();

