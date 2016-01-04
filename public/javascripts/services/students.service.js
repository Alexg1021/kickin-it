(function(){
  'use strict';

  angular.module('app')
    .service('Students', function($http, $uibModal, $rootScope){
      var vm = this;
      vm.students = [];

      /**
       * Find a student in the students list.
       *
       * @param studentId
       * @returns {*}
       */
      vm.find = function find(studentId) {
        return _.find(vm.students, {_id: studentId});
      };

      /**
       * Get students from the database and populate the local
       * client side list of student.
       *
       * @returns {*}
       */
      vm.get = function get(){
        return $http.get('/students')
          .then(function(res){
            vm.students.splice(0);
            res.data.forEach(function(student){
              vm.students.push(student);
            });
            return vm.students;
          });
      };

      vm.add = function(){
        vm.scope = $rootScope.$new();
        vm.scope.student = {};
        vm.openStudentModal().then(function(studentAdd){
          return $http.post('/students', studentAdd)
            .then(function(res){
              vm.students.push(res.data);
            }, function(err){
              console.error(err);
            });
        });
      };

      /* Editing a User through modal*/
      vm.edit = function(student){
        vm.scope = $rootScope.$new();
        vm.scope.student = student;
        vm.openStudentModal().then(function(newStudent){
          vm.editUser(newStudent.user)
            .then(function(){
          return $http.put('/students/' + newStudent._id, newStudent)
            .then(function(res){
              var _student = vm.find(newStudent._id);
              _.merge(_student, newStudent);
            }, function(err){
              console.error(err);
            });
          });
        });
      };

      /*Manually update the user model within the student model*/
      vm.editUser = function(user){
        return $http.put('/users/' + user._id, user);
      };

      /**
       * Delete a student.
       *
       * @param studentId
       * @returns {*}
       */
      vm.delete = function(studentId){
        return $http.delete('/students/' + studentId)
          .then(function(res){
              _.remove(vm.students, {_id: studentId});
          }, function(err){
            console.error(err);
          });
      };

      vm.openStudentModal = function(){
        return $uibModal.open({
          controller: 'StudentModalController',
          controllerAs: 'studentModal',
          templateUrl: 'partials/students/student-modal-form.html',
          scope: vm.scope
        }).result;
      };

    });
})();
