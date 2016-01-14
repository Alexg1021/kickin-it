(function(){

    'use strict';

    angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap'])
      .config(function($stateProvider, $urlRouterProvider){
        /*
        Default route
        */
        $urlRouterProvider.otherwise('/login');

        /**
        *Define our states
        */
        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: 'partials/login/index.html',
            controller: 'LoginController',
            controllerAs: 'loginController'
          })
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
          })
          .state('students', {
            url: '/students',
            templateUrl: 'partials/students/index.html',
            controller: 'StudentsController',
            controllerAs: 'studentsController',
            resolve:{
              students: function(Students){
                return Students.get();
              }
            }
          })
          .state('groups', {
            url: '/groups',
            templateUrl: 'partials/groups/index.html',
            controller: 'GroupsController',
            controllerAs: 'groupsController',
            resolve: {
              groups: function(Groups){
                return Groups.get();
              }
            }
          })
          .state('groups.add-roster', {
            url: '/:groupId',
            templateUrl: 'partials/groups/add-roster.html',
            controller: 'RosterController',
            controllerAs: 'rosterController',
            resolve: {
            group: function (Groups, $stateParams, groups) {
              return Groups.find($stateParams.groupId);
              }
            }
          })
          .state('dash', {
            url: '/group-dashboard',
            templateUrl: 'partials/groups/group-dash.html',
            controller: 'GroupDashController',
            controllerAs: 'groupDash',
            resolve: {
              groups: function(Groups){
                return Groups.get();
              }
            }
          });
      });
}());
