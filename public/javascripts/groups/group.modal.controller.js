(function(){
  'use strict';
  angular.module('app')
  .controller('GroupModalController', function($uibModalInstance, $scope){
    var vm = this;

    vm.group = $scope.group ? $scope.group : {};

    vm.ok = function ok (){
        $uibModalInstance.close(vm.group);
    };

    vm.cancel = function cancel(){
        $uibModalInstance.dismiss();
    };
  });
})();
