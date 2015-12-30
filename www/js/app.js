angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleHex("#FFFFFF");
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('map', {
      url: "/map",
      templateUrl: "templates/map.html",
      controller: 'MapCtrl'
    })
    .state('details', {
      url: "/details",
      templateUrl: "templates/slipwayDetails.html",
      controller: 'SlipwayDetailsCtrl'
    })
    .state('newSlipway', {
      url: "/newSlipway",
      templateUrl: "templates/newSlipway.html",
      controller: 'NewSlipwayCtrl'
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html"
        }
      }
    });


  $urlRouterProvider.otherwise("/map");

});
