(function(){
  'use strict';

  angular.module('app')
    .service('Users', function($http){
      var vm = this;
      vm.users = [];


      /**
       * Get users from the database and populate the local
       * client side list of user.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/users')
          .then(function (res) {
            vm.users.splice(0);

            res.data.forEach(function (user) {
              vm.users.push(user);
            });

            return vm.users;
          });
      };

    });
})();
