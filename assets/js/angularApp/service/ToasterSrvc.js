/**
 * Created by koc9n on 28.03.16.
 */
angular.module('ChatApp')
  .service('ToasterSrvc', ['ngToast', function (ngToast) {

    this.toastError = function (msg) {
      ngToast.create({
        timeout: 5000,
        className: 'danger',
        content: '<span>' + msg + '</span>'
      });
    };
    this.toastSuccess = function (msg) {
      ngToast.create({
        timeout: 5000,
        className: 'success',
        content: '<span>success logged in:' + msg + '</span>'
      });
    }
  }]);
