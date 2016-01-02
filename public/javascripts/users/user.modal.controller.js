(function(){
  'use strict';

  angular.module('app')
    .controller('UserModalController', function($scope, $uibModalInstance){
      var vm = this;

      vm.user = $scope.user ? $scope.user : {};

      vm.ok = function ok (){
          $uibModalInstance.close(vm.user);
      };

      vm.cancel = function cancel(){
          $uibModalInstance.dismiss();
      };

    });
})();
