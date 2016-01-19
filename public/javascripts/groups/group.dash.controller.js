(function(){
  'use strict';

  angular.module('app')
    .controller('GroupDashboardController', function(group){
      var vm = this;
      vm.group = group;
      // vm.students = students;

    });
})();
