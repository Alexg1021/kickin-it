(function(){
  'use strict';

  angular.module('app')
    .service('Groups', function($http, $rootScope, $uibModal, $state){
      var vm = this;
      vm.groups = [];
      vm.students = [];

      /**
       * Find a group in the groups list.
       *
       * @param groupId
       * @returns {*}
       */
      vm.find = function find(groupId) {
        return _.find(vm.groups, {_id: groupId});
      };

      /**
      *Get groups from database and add them to the groups array locally
      */
      vm.get = function(){
        return $http.get('/groups')
          .then(function(res){
            vm.groups.splice(0);
            res.data.forEach(function(group){
              vm.groups.push(group);
            });
            return vm.groups;
          });
      };

      vm.addUsers = function (students){
        return $http.post('/students', students)
          .then(function(res){
            vm.students.push(res.data);
          });
      };

      vm.addGroup = function(){
        vm.scope = $rootScope.$new();
        vm.scope.group = {};
        vm.openGroupModal().then(function(group){
          return $http.post('/groups', group)
          .then(function(res){
            vm.groups.push(res.data);
            $state.go('add-group.add-roster', {'groupId': res.data._id});
          }, function (err) {
          console.error(err);
        });
      });
    };

      vm.openGroupModal = function(){
        return $uibModal.open({
          controller: 'GroupModalController',
          controllerAs: 'groupModal',
          templateUrl: 'partials/groups/group-modal-form.html',
          scope: vm.scope
        }).result;
      };


      vm.addStudents = function(students, group){
            group.students = students;
            return $http.put('/groups/' + group._id, group)
              .then(function(){
                $state.go('groups');
            });
          };

    });
})();
