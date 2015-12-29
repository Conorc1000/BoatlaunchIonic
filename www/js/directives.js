angular.module('starter.directives', [])
//
// .directive('map', function($compile, slipwayLatLngService) {
//
//   return {
//     restrict: 'E',
//     scope: {
//       onCreate: '&'
//     },
//     link: function($scope, $element, $attr) {
//       function initialize() {
//         var markers = [];
//         var mapOptions = {
//           center: new google.maps.LatLng(51.50, 0.127),
//           zoom: 6,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         var map = new google.maps.Map($element[0], mapOptions);
//
//         $scope.onCreate({
//           map: map
//         });
//
//         });
//
//         // var markerClusterer = new MarkerClusterer(map, markers);
//
//         slipwayLatLngService.loadData().then(function(latLngs) {
//           var markers = [];
//           for (var LatLngKey in latLngs) {
//             var latLng = latLngs[LatLngKey];
//             var lat = Number(latLng[0]);
//             var lng = Number(latLng[1]);
//
//             createMarker(
//               new google.maps.LatLng(lat, lng)
//             );
//           }
//
//           function createMarker(latlng, html) {
//             html = "afafa";
//             // var contentString = html;
//
//             var marker = new google.maps.Marker({
//               position: latlng,
//               map: map,
//               title: "This is a marker",
//               icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                 // zIndex: Math.round(latlng.lat() * -100000) << 5
//             });
//
//             // markers.push(marker);
//             // marker.setMap(map);
//             // markerClusterer.addMarker(marker);
//
//             // attachInfoWindow(marker);
//
//             var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
//             var compiled = $compile(contentString)($scope);
//
//             var infowindow = new google.maps.InfoWindow({
//               content: compiled[0]
//             });
//
//             google.maps.event.addListener(marker, 'click', function() {
//               console.log('marker click');
//               infowindow.open(map, marker);
//             });
//
//
//           }
//
//
//         });
//
//         // Stop the side bar from dragging when mousedown/tapdown on the map
//         // google.maps.event.addDomListener($element[0], 'mousedown', function(e) {
//         //   e.preventDefault();
//         //   return false;
//         // });
//       }
//
//       if (document.readyState === "complete") {
//         initialize();
//       } else {
//         google.maps.event.addDomListener(window, 'load', initialize);
//       }
//     }
//   };
// });
