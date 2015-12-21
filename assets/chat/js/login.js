/**
 * Created by kos on 24.09.2014.
 */
var socket;

window.onload = function() {
  socket = initChat();

}

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

  socket.on("connect", function (msg) {
    console.log('socket connected');
  });

  socket.on("chat", function onServerSentEvent(msg) {
    var el = document.getElementsByClassName('ng-scope')[1];
    var scope = angular.element(el).scope();
    scope.pushToMessages(msg);
    scope.$apply();
  });
  return socket;
}

