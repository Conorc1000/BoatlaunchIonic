boatlaunchControllers

.controller('ContactCtrl', function($scope, $state) {
  $scope.contact = {};

  $scope.goToMap = function() {
    $state.go('map');
  };
});
