(function(){
  'use strict';

  angular.module('app')
    .controller('GroupDashController', function(groups){
      var vm = this;
      vm.groups = groups;

    });
})();
