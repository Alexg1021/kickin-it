(function(){
  'use strict';

  angular.module('app')
    .controller('StudentModalController', function($scope, $uibModalInstance){
      var vm = this;

      vm.student = $scope.student ? $scope.student : {};
      debugger;

      vm.ok = function ok (){
          $uibModalInstance.close(vm.student);
      };

      vm.cancel = function cancel(){
          $uibModalInstance.dismiss();
      };

    });
})();
