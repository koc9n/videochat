/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * load Chat page
   * @param req
   * @param res
   */
  chat: function (req, res) {
    sails.log(req.session);
    return res.view("chat");
  },

  /**
   * this method is entry point for socket connection.
   * @param req
   * @param res
   */
  init: function (req, res) {
    var data_from_client = req.params.all();
    sails.log(data_from_client);
    //sails.log("session user: " + sessionUser.email+sessionUser.username);
    /**
     * POST
     */
    if (req.isSocket && req.method === 'POST') {
      // This is the message from connected client
      // So add new conversation
      User.find(req.session.passport.user).exec(function findCB(err, found) {
        while (found.length) {
          var sessionUser = found.pop();
          Chat.create({message: data_from_client.message, user: sessionUser})
            .exec(function (error, data_from_client) {
              console.log(data_from_client);
              req.socket.emit('chat', {message: data_from_client.message, user: sessionUser});
            });
        }
      });

    }

    /**
     * GET
     */
    else if (req.isSocket) {
      // subscribe client to model changes
      console.log('User subscribed to ' + req.socket.id);
    }
  },

};

