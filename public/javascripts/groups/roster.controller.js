(function(){
  'use strict';

  angular.module('app')
    .controller('RosterController', function($scope, $stateParams, $state, Groups, groups, group){
      var vm = this;
      vm.group = group;
      vm.studs = Groups.students;
      vm.student = {};
      vm.students = [{id: 'Student 1'}, {id: 'Student 2'}, {id: 'Student 3'}];
      vm.add = Groups.addStudents;

      //Adding and removing additional forms for locations and clients

      vm.addStudents = function(){
        vm.newItemNo = vm.students.length+1;
        vm.students.push({'id': 'Student '+vm.newItemNo});
      };

      vm.removeStudents = function (){
        vm.lastItem = vm.students.length-1;
        vm.students.splice(vm.lastItem);
      };

    });
})();
