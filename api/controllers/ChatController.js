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
    return res.view("chat");
  },

  /**
   * this method is entry point for socket connection.
   * @param req
   * @param res
   */
  init: function (req, res) {
    var data_from_client = req.params.all();

    /**
     * POST
     */
    if (req.isSocket && req.method === 'POST') {
      // This is the message from connected client
      // So add new conversation
      if(data_from_client.message.trim() != "") {
        User.find(req.session.passport.user.id).exec(function findCB(err, found) {
          while (found.length) {
            var sessionUser = found.pop();
            ChatItem.create({message: data_from_client.message, user: sessionUser}).populate('user')
              .exec(function (error, data_from_client) {
                if (err) {
                  sails.error(err);
                }
                data_from_client.user = sessionUser;
                sails.sockets.broadcast('1', 'chat', data_from_client);
              });
          }
        });
      }
    }

    /**
     * GET
     */
    else if (req.isSocket) {
      sails.sockets.join(req.socket,'1');
      ChatItem.find().populate('user').exec(function (err, chatHistory) {
        if (err) {
          sails.error(err);
        }
        sails.sockets.emit(req.socket,'init', chatHistory);
      })
    }
  }
};

