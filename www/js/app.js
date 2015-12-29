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
      templateUrl: "map.html",
      controller: 'MapCtrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
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
