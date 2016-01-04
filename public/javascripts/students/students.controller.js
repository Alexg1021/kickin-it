(function(){
  'use strict';

  angular.module('app')
    .controller('StudentsController', function(students, Students){
      var vm = this;
      vm.students = students;
      vm.add = Students.add;
      vm.edit = Students.edit;
      vm.del = Students.delete;
    });
})();
