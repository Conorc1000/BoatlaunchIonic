var body_parser = require('body-parser');
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');

var express = require('express');
var app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);

var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/sign_s3', function(req, res) {
  console.log('query========================>>>>>>>>>>>>', req.query);
  console.log(AWS_SECRET_KEY);
  aws.config.update({
    accessKeyId: 'AKIAJ37FIF773HO2ZVWA',
    secretAccessKey: AWS_SECRET_KEY
  });
  var s3 = new aws.S3();
  var s3_params = {
    Bucket: 'boatlaunchphotos',
    Key: 'WebSitePhotos/' + req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3_params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var return_data = {
        signed_request: data,
        url: 'https://' + 'boatlaunchphotos' + '.s3.amazonaws.com/' + req.query.imgId
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
});
