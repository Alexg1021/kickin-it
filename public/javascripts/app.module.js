(function(){

    'use strict';

    angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap'])
      .config(function($stateProvider, $urlRouterProvider){
        /*
        Default route
        */
        $urlRouterProvider.otherwise('/landing');

        /**
        *Define our states
        */
        $stateProvider
          .state('landing', {
            url: '/landing',
            templateUrl: 'partials/users/index.html',
            controller: 'UsersController',
            controllerAs: 'usersController',
            resolve:{
              users: function (Users) {
              return Users.get();
            }
            }
          });

      });

}());
