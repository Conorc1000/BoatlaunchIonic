boatlaunchControllers

.controller('MapCtrl', function($scope, $ionicLoading, $compile, SlipwayLatLngService,
  SlipwayDetailsService, MapLocationService, $state) {
  //called when the page loads or you go back to the route
  function initialize() {
    console.log('init');
    var center;

    // if(slipwayDetails === true){
    //   center = new google.maps.LatLng(slipwayDetails, 0);
    // }
    var latLongZoom = MapLocationService.getLatLongZoom();
    center = new google.maps.LatLng(latLongZoom[0],latLongZoom[1]);

    var mapOptions = {
      center: center,
      zoom: latLongZoom[2],
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    var markerClusterer = new MarkerClusterer(map);


    $scope.map = map;

    SlipwayLatLngService.loadData().then(function(latLngs) {
      for (var LatLngKey in latLngs) {
        var latLng = latLngs[LatLngKey];
        var lat = Number(latLng[0]);
        var lng = Number(latLng[1]);

        var position = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
          position: position,
          map: map
        });
        //adds a listener sets the window to have the correct info and location
        addInfoWindow(marker, latLng);
        $scope.map = map;

        markerClusterer.addMarker(marker);

      }
    });

    var infoWindow = new google.maps.InfoWindow();

    function addInfoWindow(marker, latLng) {

      var slipwayKey = latLng[2];
      marker.addListener('click', function() {
        SlipwayDetailsService.loadData(slipwayKey).then(function(data) {
          console.log('slipway click', data);
          var name = data.Name || 'unknown',
            lat = latLng[0].substr(0, 10),
            lng = latLng[1].substr(0, 10);

            MapLocationService.setLatLongZoom(lat, lng, 9);


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
    //changes to the details state
    $state.go('details');
  };

  $scope.addSlipway = function() {
    $state.go('newSlipway');
  };
  if(true){
  //if (SlipwayLatLngService.isLoaded()) {
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
