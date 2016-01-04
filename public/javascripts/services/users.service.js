(function(){
  'use strict';

  angular.module('app')
    .service('Users', function($http, $uibModal, $rootScope){
      var vm = this;
      vm.users = [];

      /**
       * Find a user in the users list.
       *
       * @param userId
       * @returns {*}
       */
      vm.find = function find(userId) {
        return _.find(vm.users, {_id: userId});
      };


      /**
       * Get users from the database and populate the local
       * client side list of user.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/users')
          .then(function (res) {
            vm.users.splice(0);

            res.data.forEach(function (user) {
              vm.users.push(user);
            });

            return vm.users;
          });
      };

      /* Add a user with Modal */
      vm.add = function(){
        vm.scope = $rootScope.$new();
        vm.scope.user = {};
        vm.openUserModal().then(function(user){
          return $http.post('/users', user)
            .then(function(res){
              vm.users.push(res.data);
            }, function (err) {
            console.error(err);
          });
        });
      };

      /* Editing a User through modal*/
      vm.edit = function(user){
        vm.scope = $rootScope.$new();
        vm.scope.user = user;
        vm.openUserModal().then(function(newUser){
          return $http.put('/users/' + newUser._id, newUser)
            .then(function(res){
              var _user = vm.find(newUser._id);
              _.merge(_user, newUser);
            }, function(err){
              console.error(err);
            });
        });
      };

      /* Modal to add or edit a User*/
      vm.openUserModal = function(){
        return $uibModal.open({
                controller: 'UserModalController',
                controllerAs: 'userModal',
                templateUrl: 'partials/users/user-modal-form.html',
                scope: vm.scope
              }).result;
      };


      /**
       * Delete a user.
       *
       * @param userId
       * @returns {*}
       */
      vm.delete = function(userId){
        return $http.delete('/users/' + userId)
          .then(function(res){
              _.remove(vm.users, {_id: userId});
          }, function(err){
            console.error(err);
          });
      };

    });
})();
