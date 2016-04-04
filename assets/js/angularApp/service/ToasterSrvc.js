/**
 * Created by koc9n on 28.03.16.
 */
angular.module('ChatApp')
  .service('ToasterSrvc', ['ngToast', function (ngToast) {
    var settings = {
      timeout : 1000
    };

    this.toastError = function (msg) {
      ngToast.create({
        timeout: settings.timeout,
        className: 'danger',
        content: '<span>' + msg + '</span>'
      });
    };
    this.toastSuccess = function (msg) {
      ngToast.create({
        timeout: settings.timeout,
        className: 'success',
        content: '<span>success logged in:' + msg + '</span>'
      });
    }
  }]);
