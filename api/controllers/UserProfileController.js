/**
 * UserProfileController
 *
 * @description :: Server-side logic for managing Userprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  profile: function (req, res) {
    sails.log(req.session);
    return res.view("userprofile");
  },
  home: function (req, res) {
    sails.log(req.session);
    return res.view("homepage");
  },
};

