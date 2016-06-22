var tvmApp=angular.module('tvmApp',['ui.router']);

tvmApp.config(function ($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider.state('home', {
      url: '/',
      templateUrl: 'public/app/templates/home.ejs',
      controller: 'HomeCtrl'
    }).state('signup', {
        url: '/signup',
        templateUrl: 'public/app/templates/signup.ejs',
        controller: 'SignupCtrl'
      });
});
