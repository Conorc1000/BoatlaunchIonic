boatlaunchServices

  .factory("ImgUploadService", function(SlipwayDetailsService, firebaseRef) {

  var uniqueImageNumber = 0;

  AWS.config.update({
    accessKeyId: 'AKIAIC55N4PSACLZW5DA',
    secretAccessKey: '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'
  });
  AWS.config.region = 'eu-west-1'; //could also be Ireland




  var uploadImg = function(fileChooser, results, slipway) {
    var maxImgId;
    firebaseRef.child("maxImgId").once('value', function(snapshot) {
      maxImgId = snapshot.val() + 1;
      firebaseRef.child("maxImgId").set(maxImgId, function(error) {
        if (error) {
          console.log('maxImgId Synchronization failed', error);
        }else{
          console.log('maxImgId Synchronization succeeded');

          if (!slipway.imgs) {
            slipway.imgs = [];
          }
          slipway.imgs.push(maxImgId);
          firebaseRef.child("slipwayDetails").child(slipway.idKey).child("imgs").set(slipway.imgs, function(err) {
            if (error) {
              console.log('push imgId to firebase failed', error);
            }else{
              console.log('push imgId to firebase succeeded');
              putImgToAWS(maxImgId);
            }
          });
        }
      });
    });

    function putImgToAWS(maxImgId) {

      var bucket = new AWS.S3({
        params: {
          Bucket: 'boatlaunchimages',
          Key: "WebSitePhotos/" + maxImgId + "___Source.jpg",
          ACL: "public-read"
        }
      });

      var file = fileChooser.files[0];
      console.log(file);
      if (file) {
        results.innerHTML = '';

        var params = {
          ContentType: file.type,
          Body: file
        };
        bucket.upload(params, function(err, data) {
          console.log("data-------->>>>>>>>>", data);
          results.innerHTML = err ? err + 'ERROR!' : 'UPLOADED.';
        });
      } else {
        results.innerHTML = 'Nothing to upload.';
      }
    }
  };
  return {
    uploadImg: uploadImg
  };
});
