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

    /**
     * POST
     */
    if (req.isSocket && req.method === 'POST') {
      // This is the message from connected client
      // So add new conversation
      if(data_from_client.message.trim() != "") {
        User.find(req.session.passport.user).exec(function findCB(err, found) {
          while (found.length) {
            var sessionUser = found.pop();
            Chat.create({message: data_from_client.message, user: sessionUser}).populate('user')
              .exec(function (error, data_from_client) {
                if (err) {
                  sails.error(err);
                }
                sails.sockets.broadcast('1', 'chat', {message: data_from_client.message, user: sessionUser});
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
      Chat.find({}).populate('user').exec(function (err, chatHistory) {
        if (err) {
          sails.error(err);
        }
        sails.sockets.broadcast('1','init', chatHistory);
      })
    }
  }
};

