boatlaunchServices

  .factory('SlipwayDetailsService', function($q, firebaseRef) {

  var memo = {};
  var mostRecentSlipway;

  var getMostRecentSlipway = function() {
    return mostRecentSlipway;
  };

  var loadData = function(slipwayKey) {
    var deferred = $q.defer();

    if (memo[slipwayKey]) {
      deferred.resolve(memo[slipwayKey]);
      return deferred.promise;
    }

    firebaseRef.child("slipwayDetails").child(slipwayKey).once('value', function(snapshot) {

        var slipwayDetails = mostRecentSlipway = snapshot.val();
        memo[slipwayKey] = slipwayDetails;
        deferred.resolve(slipwayDetails);

      },
      function(error) {
        deferred.reject();
      });
    return deferred.promise;
  };

  var saveData = function(id, data) {
    console.log('id, data', id, data);

    var withLatLngRemoved = {
      Charges: data.Charges || null,
      Directions: data.Directions || null,
      Facilities: data.Facilities || null,
      LowerArea: data.LowerArea || null,
      Name: data.Name || null,
      NavigationalHazards: data.NavigationalHazards || null,
      NearestPlace: data.NearestPlace || null,
      RampDescription: data.RampDescription || null,
      RampLength: data.RampLength || null,
      RampType: data.RampType || null,
      Suitability: data.Suitability || null,
      UpperArea: data.UpperArea || null,
      idKey: id
    };

    console.log('withLatLngRemoved', withLatLngRemoved);
    firebaseRef.child("slipwayDetails").child(id).set(withLatLngRemoved, function(error) {
      if (error) {
        console.log('slipwayDetails Synchronization failed', error);
      } else {
        console.log('slipwayDetails Synchronization succeeded');
      }
    });
  };

  return {
    loadData: loadData,
    saveData: saveData,
    getMostRecentSlipway: getMostRecentSlipway
  };
});
