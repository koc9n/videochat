/**
 * Created by koc9n on 21.02.16.
 */
var myApp = angular.module('ChatApp',
  ['ngRoute', 'ngToast', 'ngCookies']).
config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        public: true
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        public: true
      })
      .when('/logout', {
        template:'',
        controller: 'LogoutCtrl',
        public: true
      })
      .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl',
        public: true
      })
      .when('/chat', {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl',
        public: false
      })
      .otherwise({
        redirectTo: '/',
        caseInsensitiveMatch: true,
        public: true
      })
  }]).run(['$rootScope', '$location', 'CookieSrvc', 'ToasterSrvc', function ($rootScope, $location, CookieSrvc, ToasterSrvc) { //Insert in the function definition the dependencies you need.
  //Do your $on in here, like this:
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    //Do your things
    $rootScope.authenticated = CookieSrvc.get('user') != null;
    if (!next.public && !CookieSrvc.isAuthenticated()) {

      $location.path('/login');
      ToasterSrvc.toastError(next.originalPath + '. 403 error. Access Denied');
    }
  });
}]);
