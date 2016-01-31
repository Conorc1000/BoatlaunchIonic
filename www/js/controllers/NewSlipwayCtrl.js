boatlaunchControllers

.controller('NewSlipwayCtrl', function($scope, $state, $ionicPopup, AddNewSlipway) {
  $scope.slipwayDetails = {};

  $scope.goToMap = function() {
    console.log("IN THE NewSlipwayCtrl CTRL");

    $state.go('map');
  };

  var showAlert = function() {
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: '<h3>Invalid slipway info</h3>',
        subTitle: '<h4>Please check that the slipway has a name, latitude and longitude</h4>',
        scope: $scope,
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
                e.preventDefault();
            }
          }
        ]
      });
     };

  $scope.saveChanges = function() {

    if (!$scope.slipwayDetails.Name || !$scope.slipwayDetails.lat || !$scope.slipwayDetails.lng) {
      showAlert();
    } else {
      AddNewSlipway($scope.slipwayDetails);
    }
  };
});
