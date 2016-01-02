var boatlaunchServices = angular.module('starter.services', [])

.constant('FIREBASE_URL', 'https://boatlaunch.firebaseio.com/')


.factory('firebaseRef', function(FIREBASE_URL) {

  var firebaseRef = new Firebase(FIREBASE_URL);

  return firebaseRef;
});
