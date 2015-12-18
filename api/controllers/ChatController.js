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
    /**
     * POST
     */
    if (req.isSocket && req.method === 'POST') {
      // This is the message from connected client
      // So add new conversation
      Chat.create(data_from_client)
        .exec(function (error, data_from_client) {
          console.log(data_from_client);
          Chat.publishCreate({id: data_from_client.id, message: data_from_client.message, user: data_from_client.user});
        });
      req.socket.emit('chat', "connected");
    }

    /**
     * GET
     */
    else if (req.isSocket) {
      // subscribe client to model changes
      Chat.watch(req.socket);
      req.socket.emit('chat', "connected");
      console.log('User subscribed to ' + req.socket.id);
    }
  },

};

