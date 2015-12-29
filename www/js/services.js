angular.module('starter.services', [])

.service('modalService', function($ionicModal) {

  this.openModal = function(id) {

    var _this = this;

    if (id == 1) {
      $ionicModal.fromTemplateUrl('templates/slipwayDetails.html', {
        id: '1',
        scope: null,
      }).then(function(modal) {
        console.log('modal', modal);
        _this.modal = modal;
        _this.modal.show();
      });
    } else if (id == 2) {
      $ionicModal.fromTemplateUrl('templates/login.html', {
        id: '3',
        controller: 'LoginSearchCtrl'
      }).then(function(modal) {
        _this.modal = modal;
        _this.modal.show();
      });
    }else if (id == 3) {
      $ionicModal.fromTemplateUrl('templates/signup.html', {
        id: '3',
        scope: null,
        controller: 'LoginSearchCtrl'
      }).then(function(modal) {
        _this.modal = modal;
        _this.modal.show();
      });
    }
  };

  this.closeModal = function() {

    console.log('close');
    var _this = this;

    if (!_this.modal) return;
    _this.modal.hide();
    _this.modal.remove();
  };

})


.constant('FIREBASE_URL', 'https://boatlaunch.firebaseio.com/')


.factory('firebaseRef', function(FIREBASE_URL) {

  var firebaseRef = new Firebase(FIREBASE_URL);

  return firebaseRef;
})

.factory('slipwayLatLngService', function($q, firebaseRef) {

  var memo = null;

  var loadData = function() {
    var deferred = $q.defer();

    if (memo) {
      deferred.resolve(memo);
      return deferred.promise;
    }

    firebaseRef.child("latLngs").once('value', function(snapshot) {

        var latLngs = snapshot.val();
        memo = latLngs;
        deferred.resolve(latLngs);

      },
      function(error) {
        deferred.reject();
      });
    return deferred.promise;
  };

  return {
    loadData: loadData
  };
})

.factory('slipwayDetailsService', function($q, firebaseRef) {

  // var MAX_STORED = 20;
  var memo = {};
  var mostRecentSlipway;

  var loadData = function(slipwayKey) {
    var deferred = $q.defer();

    if (memo[slipwayKey]) {
      deferred.resolve(memo[slipwayKey]);
      return deferred.promise;
    }

    firebaseRef.child("slipwayDetails").child(slipwayKey).once('value', function(snapshot) {

        var slipwayDetails = snapshot.val();
        memo[slipwayKey] = slipwayDetails;
        deferred.resolve(snapshot.val());

      },
      function(error) {
        deferred.reject();
      });
    return deferred.promise;
  };

  return {
    loadData: loadData,
    mostRecentSlipway: mostRecentSlipway
  };
})

.factory('userService', function() {



  return {

  };
});
