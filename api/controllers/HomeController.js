/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Load main page (homepage)
   * @param req
   * @param res
     */
  home: function (req, res) {
    return res.view("homepage");
  }
};

