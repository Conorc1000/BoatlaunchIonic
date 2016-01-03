boatlaunchServices

.factory('SlipwayLatLngService', function($q, firebaseRef) {

  var memo = null;
  var loaded = false;

  var getSavedLatLngs = function() {
    return memo;
  };

  var isLoaded = function() {
    return loaded;
  };

  var loadData = function() {
    var deferred = $q.defer();

    if (memo) {
      deferred.resolve(memo);
      return deferred.promise;
    }

    firebaseRef.child("latLngs").once('value', function(snapshot) {

        var latLngs = snapshot.val();
        memo = latLngs;
        loaded = true;
        deferred.resolve(latLngs);

      },
      function(error) {
        deferred.reject();
      });
    return deferred.promise;
  };

  var saveData = function(id, data) {
    console.log('id, data', id, data);

    var latLngOnly = [data.lat, data.lng, id];
    console.log('latLngOnly',latLngOnly);
    firebaseRef.child("latLngs").child(id).set(latLngOnly, function(error) {
      if (error) {
        console.log('lat long Synchronization failed', error);
      } else {
        console.log('lat long Synchronization succeeded');
      }
    });
  };

  return {
    loadData: loadData,
    saveData: saveData,
    isLoaded: isLoaded,
    getSavedLatLngs: getSavedLatLngs
  };
})
