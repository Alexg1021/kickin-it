(function(){
  'use strict';

  angular.module('app')
    .controller('AddGroupController', function(groups, Groups){
      var vm = this;
      vm.groups = groups;
      vm.add = Groups.addGroup;
    });
})();
