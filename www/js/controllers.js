angular.module('starter.controllers', [])


.controller('MapCtrl', function($scope, $ionicLoading, $compile, slipwayLatLngService, slipwayDetailsService, $state) {
  function initialize() {
    console.log('init');
    var center = new google.maps.LatLng(51.5, 0);

    var mapOptions = {
      center: center,
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    var markerClusterer = new MarkerClusterer(map);


    $scope.map = map;

    slipwayLatLngService.loadData().then(function(latLngs) {
      for (var LatLngKey in latLngs) {
        var latLng = latLngs[LatLngKey];
        var lat = Number(latLng[0]);
        var lng = Number(latLng[1]);

        var position = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
          position: position,
          map: map
        });

        addInfoWindow(marker, latLng);
        $scope.map = map;

        markerClusterer.addMarker(marker);

      }
    });

    var infoWindow = new google.maps.InfoWindow();

    function addInfoWindow(marker, latLng) {

      var slipwayKey = latLng[2];
      marker.addListener('click', function() {
        slipwayDetailsService.loadData(slipwayKey).then(function(data) {
          console.log('slipway click', data);
          var name = data.Name || 'unknown',
            lat = latLng[0].substr(0, 10),
            lng = latLng[1].substr(0, 10);

          var contentString = "<div class='scrollFix'>" +
            "<div><b> Name:</b> " + name + "</div>" +
            "<div> <b> Lat: </b>" + lat + "</div>" +
            "<div> <b> Lng: </b>" + lng + "</div>" +
            "<button ng-click='goToDetails()' class='button button-full button-small button-positive'>More Info</button>" +
            "</div>";

          var compiled = $compile(contentString)($scope);

          infoWindow.setContent(compiled[0]);

          infoWindow.open(map, marker);

        });

      });
    }

    google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });
  }


  $scope.goToDetails = function() {
    $state.go('details');
  };

  $scope.addSlipway = function() {
    $state.go('newSlipway');
  };

  if (slipwayLatLngService.isLoaded()) {
    initialize();
  } else {
    google.maps.event.addDomListener(window, 'load', initialize);
  }

  $scope.centerOnMe = function() {
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      console.log('Unable to get location: ' + error.message);
    });
  };

})

.controller('SlipwayDetailsCtrl', function($scope, $state, slipwayLatLngService, slipwayDetailsService) {

  $scope.slipwayDetails = slipwayDetailsService.getMostRecentSlipway();
  var slipwayCopy = angular.copy($scope.slipwayDetails);

  if (!$scope.slipwayDetails) {
    $state.go('map');
  } else {
    var id = $scope.slipwayDetails.idKey;
    $scope.slipwayPropKeys = Object.keys($scope.slipwayDetails);
    $scope.slipwayDetails.lat = slipwayLatLngService.getSavedLatLngs()[id][0];
    $scope.slipwayDetails.lng = slipwayLatLngService.getSavedLatLngs()[id][1];
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
    slipwayLatLngService.saveData(slipwayCopy.idKey, $scope.slipwayDetails);
    slipwayDetailsService.saveData(slipwayCopy.idKey, $scope.slipwayDetails);
  };

  $scope.flagSlipway = function() {
    console.log('flag slipway');
  };

  $scope.goToMap = function() {
    $state.go('map');
  };

  console.log('$scope.slipwayDetails', $scope.slipwayDetails);
})

.controller('NewSlipwayCtrl', function($scope, $state, $ionicPopup, addNewSlipway) {
  $scope.slipwayDetails = {};

  $scope.goToMap = function() {
    $state.go('map');
  };

  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Invalid slipway data. \n Pease check that slipway has a name, lat and lng',
      template: ''
    });

    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };

  $scope.saveChanges = function() {

    if (!$scope.slipwayDetails.Name || !$scope.slipwayDetails.lat || !$scope.slipwayDetails.lng) {
      showAlert();
    } else {
      addNewSlipway($scope.slipwayDetails);
    }
  };
});
