angular.module('starter.services', [])

.constant('FIREBASE_URL', 'https://boatlaunch.firebaseio.com/')


.factory('firebaseRef', function(FIREBASE_URL) {

  var firebaseRef = new Firebase(FIREBASE_URL);

  return firebaseRef;
})

.factory('slipwayLatLngService', function($q, firebaseRef) {

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
        console.log('slipwayDetails Synchronization failed', error);
      } else {
        console.log('slipwayDetails Synchronization succeeded');
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

.factory('slipwayDetailsService', function($q, firebaseRef) {

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

    console.log('withLatLngRemoved',withLatLngRemoved);
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
})

.factory('addNewSlipway', function(slipwayDetailsService, slipwayLatLngService){

  return function(data){
    var maxNumber = 0;
    var latLngs = slipwayLatLngService.getSavedLatLngs();

    for(var latLngKey in latLngs){
      var idNumber = Number(latLngs[latLngKey][2]);

      if(idNumber >= maxNumber){
        maxNumber = idNumber + 1;
      }
    }

    console.log('maxNumber.toString(), data',maxNumber.toString(), data);
    // slipwayLatLngService.saveData(maxNumber.toString(), data);
    // slipwayDetailsService.saveData(maxNumber.toString(), data);


  };
});
