angular.module('starter.controllers', [])


.controller('MapCtrl', function($scope, $ionicLoading, $compile, slipwayLatLngService, slipwayDetailsService, modalService, $ionicModal) {
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
          map: map,
          title: 'Uluru (Ayers Rock)'
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
        var content = slipwayDetailsService.loadData(slipwayKey).then(function(data) {
          console.log('slipway click', data);
          var name = data.Name || 'unknown',
            lat = latLng[0].substr(0, 10),
            lng = latLng[1].substr(0, 10);

          var contentString = "<div>" +
            "<div><b> Name:</b> " + name + "</div>" +
            "<div> <b> Lat: </b>" + lat + "</div>" +
            "<div> <b> Lat: </b>" + lng + "</div>" +
            "<button href='#/tab/about' class='button button-full button-small button-positive'>More Info</button>" +
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


  $scope.openModal = function(index) {
    console.log('MapCtrl open modal');
    // $scope.oModal1.show();
  };


  google.maps.event.addDomListener(window, 'load', initialize);

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

.controller('slipwayDetailsCtrl', function($scope, slipwayDetailsService, modalService) {

  $scope.slipwayDetails = slipwayDetailsService.mostRecentSlipway;

  $scope.closeModal = function() {
    console.log('closeModal');
    modalService.closeModal();
  };

  console.log('$scope.closeModal', $scope.closeModal);
  console.log('$scope.slipwayDetails', $scope.slipwayDetails);
})

.controller('LoginSignupCtrl', ['$scope', 'modalService', 'userService',
  function($scope, modalService, userService) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.closeModal = function() {
      console.log('closemodal');
      // modalService.closeModal();
    };

    $scope.signup = function(user) {
      // userService.signup(user);
    };

    $scope.login = function(user) {
      // userService.login(user);
    };
  }
])

.controller('MyStocksCtrl', ['$scope', 'modalService', 'userService',
  function($scope, modalService, userService) {

    $scope.list = {
      email: '',
      password: ''
    };

    $scope.closeModal = function() {
      console.log('closemodal');
      // modalService.closeModal();
    };

    $scope.signup = function(user) {
      // userService.signup(user);
    };

    $scope.login = function(user) {
      // userService.login(user);
    };
  }
])
