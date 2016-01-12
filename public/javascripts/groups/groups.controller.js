(function(){
  'use strict';

  angular.module('app')
    .controller('GroupsController', function(groups, Groups){
      var vm = this;
      vm.groups = groups;
      vm.add = Groups.add;
    });
})();
