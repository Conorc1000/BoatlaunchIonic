boatlaunchServices

  .factory("FetchImgsService", function() {

  var prefix = "https://s3-eu-west-1.amazonaws.com/boatlaunchphotos/WebSitePhotos/";
  var suffix = "___Source.jpg";

  var getUrls = function(imgIds) {
    console.log("imgIds----->>>", imgIds);
    if (!imgIds) {
      return;
    }
    var urls = imgIds.map(function(imgId) {
      return {
        src: prefix + imgId + suffix
      };
    });
    console.log("urls------>>>>>", urls);
    return urls;
  };

  return {
    getUrls: getUrls
  };
});
