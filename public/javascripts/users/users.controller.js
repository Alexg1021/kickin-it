(function(){
  'use strict';

  angular.module('app')
    .controller('UsersController', function(users, Users){
      var vm = this;
      vm.users = users;
      vm.add = Users.add;
      vm.edit = Users.edit;
      vm.del = Users.delete;
    });
})();
