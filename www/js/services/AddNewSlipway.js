boatlaunchServices

.factory('AddNewSlipway', function(SlipwayDetailsService, SlipwayLatLngService){

  return function(data){
    var maxNumber = 5000;
    var latLngs = SlipwayLatLngService.getSavedLatLngs();

    for(var latLngKey in latLngs){
      var idNumber = Number(latLngs[latLngKey][2]);

      if(idNumber >= maxNumber){
        maxNumber = idNumber + 1;
      }
    }

    console.log('maxNumber.toString(), data',maxNumber.toString(), data);
    SlipwayLatLngService.saveData(maxNumber.toString(), data);
    SlipwayDetailsService.saveData(maxNumber.toString(), data);


  };
});
