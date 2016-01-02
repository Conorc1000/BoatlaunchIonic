boatlaunchControllers

  .controller('SlipwayDetailsCtrl', function($scope, $state, SlipwayLatLngService, SlipwayDetailsService, FetchImgsService, ImgUploadService) {


  $scope.slipwayDetails = SlipwayDetailsService.getMostRecentSlipway();
  var slipwayCopy = angular.copy($scope.slipwayDetails);

  if (!$scope.slipwayDetails) {
    $state.go('map');
  } else {
    $scope.images = FetchImgsService.getUrls($scope.slipwayDetails.imgs);
    var id = $scope.slipwayDetails.idKey;
    $scope.slipwayPropKeys = Object.keys($scope.slipwayDetails);
    $scope.slipwayDetails.lat = SlipwayLatLngService.getSavedLatLngs()[id][0];
    $scope.slipwayDetails.lng = SlipwayLatLngService.getSavedLatLngs()[id][1];
  }

  $scope.editing = false;

  $scope.editSlipway = function() {
    $scope.editing = true;
  };

  $scope.cancelEditSlipway = function() {
    $scope.editing = false;
    $scope.slipwayDetails = angular.copy(slipwayCopy);
  };

  $scope.saveChanges = function() {
    $scope.editing = false;
    SlipwayLatLngService.saveData(slipwayCopy.idKey, $scope.slipwayDetails);
    SlipwayDetailsService.saveData(slipwayCopy.idKey, $scope.slipwayDetails);
  };

  $scope.flagSlipway = function() {
    console.log('flag slipway');
  };

  $scope.goToMap = function() {
    $state.go('map');
  };

  $scope.uploadImgs = function() {

    var fileChooser = document.getElementById('file-chooser');
    var results = document.getElementById('results');

    ImgUploadService.uploadImg(fileChooser, results, $scope.slipwayDetails)
  };
});
