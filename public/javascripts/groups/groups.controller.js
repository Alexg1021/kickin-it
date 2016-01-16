(function(){
  'use strict';

  angular.module('app')
    .controller('GroupsController', function(groups){
      var vm = this;
      vm.groups = groups;

    });
})();
