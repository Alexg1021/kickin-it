(function(){
  'use strict';

  angular.module('app')
    .controller('UsersController', function(users){
      var vm = this;
      vm.users = users;
    });
})();
