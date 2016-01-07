boatlaunchServices

  .factory('MapLocationService', function(FIREBASE_URL) {

  var STARTING_LAT = 51.5;
  var STARTING_LONG = 0;
  var STARTING_ZOOM = 6;

  var currentLat = STARTING_LAT;
  var currentLong = STARTING_LONG;
  var currentZoom = STARTING_ZOOM;


  var setLatLongZoom = function(lat, lng, zoom) {
    currentLat = lat;
    currentLong = lng;
    currentZoom = zoom;
  };

  var getLatLongZoom = function() {
    return [currentLat, currentLong, currentZoom];
  };

  return {
    setLatLongZoom: setLatLongZoom,
    getLatLongZoom: getLatLongZoom
  };
});
