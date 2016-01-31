boatlaunchControllers

.controller('ContactCtrl', function($scope, $state) {
  console.log("IN THE CONTACT CTRL");
  $scope.contact = {};

  $scope.goToMap = function() {
    console.log("GO TO MAP BEING CALLED");
    $state.go('map');
  };
});
