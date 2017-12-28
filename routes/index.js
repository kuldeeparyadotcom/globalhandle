var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { title: 'Global Handle' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  // res.render('confirmation', { title: 'Global Handle' });

  firstname = req.body.firstname;
  lastname = req.body.lastname;
  email = req.body.email;
  twitter = req.body.twitter;
  facebook = req.body.facebook;
  linkedin = req.body.linkedin;

  //Create global handle object
  globalHandle = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    twitter: twitter,
    facebook: facebook,
    linkedin: linkedin
  }

  console.log(globalHandle);

  var globalhandleWebsite = {
    uniqueBucketName: '', //To be populated by function generateUniqueBucketName
    globalhandleUrl: '' //once index.html is uploaded, it needs to overridden
  }

  function generateUniqueBucketName(email) {
    //Logic to create unique bucket name
    uniqueBucketName = "globalhandle-" + email.split('@')[0] ;
    console.log(uniqueBucketName);
    globalhandleWebsite.uniqueBucketName = uniqueBucketName;
  };

  generateUniqueBucketName(globalHandle.email); //Generate unique bucket name

  // Load the SDK for JavaScript
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: 'us-east-1'});

  function createUniqueBucket(uniqueBucketName) {
    // Create S3 service object
    s3 = new AWS.S3({apiVersion: '2006-03-01'});

    var bucketParams = {
        Bucket: uniqueBucketName
    };

    //Create s3 bucket
    s3.createBucket(bucketParams, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Location);

          //Create objects inside bucket
          createRequiredObjects(globalHandle)
          generateAndUploadIndexAndErrorFiles(globalHandle, globalhandleWebsite)

          //Turn On Static Website Feature
          turnOnStaticWebsiteFeature(globalhandleWebsite)
        }
    });
  };

  createUniqueBucket(globalhandleWebsite.uniqueBucketName) //Call to create Unique Bucket function

  //Create required objects in newly created bucket
  function createRequiredObjects(globalHandle) {
    Object.keys(globalHandle).forEach(function(key) {
      if (key) {
        body = globalHandle[key]
        var params = {
          Body: body, 
          Bucket: globalhandleWebsite.uniqueBucketName, 
          Key: key
         };
        
         s3.putObject(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data);
          }
       });
      }
   });
  };

  function generateAndUploadIndexAndErrorFiles(globalHandle, globalhandleWebsite) {
    //Create index.html and error.html - Digitial Handle Card
    index_ejs_file = fs.readFileSync('views/globalhandle-index.ejs', 'utf-8');
    index_html_content = ejs.render(index_ejs_file, { 
      title: 'Global Handle',
      email: globalHandle.email,
      linkedin: globalHandle.linkedin,
      twitter: globalHandle.twitter,
      facebook: globalHandle.facebook  
      });

    //Upload dynamically generated index.html and error.html as public objects
    var params_index = {
      ACL: 'public-read',
      Bucket: globalhandleWebsite.uniqueBucketName,
      Key: 'index.html', //hardcoded
      Body: index_html_content,
      ContentType: 'text/html'
    };

    s3.upload(params_index, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        globalhandleWebsite.globalhandleUrl = data.Location;
        console.log(data);
      }
   });

   //Let's keep error.html simple for now
    var params_error = {
      ACL: 'public-read',
      Bucket: globalhandleWebsite.uniqueBucketName,
      Key: 'error.html', //hardcoded
      Body: 'Sorry, Some error occurred! Please try again!',
      ContentType: 'text/html'
    };

    s3.upload(params_error, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  };
   
  function turnOnStaticWebsiteFeature(globalhandleWebsite) {
    //TODO - Turn this bucket to static website
    s3.getBucketWebsite(globalhandleWebsite.uniqueBucketName, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else if (data) {
        console.log("Success", data);
      }
    });

    var staticHostParams = {
      Bucket: globalhandleWebsite.uniqueBucketName,
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: 'error.html' //hardcoded
        },
        IndexDocument: {
          Suffix: 'index.html' //hardcoded
        },
      }
    };

    // set the new policy on the selected bucket
    s3.putBucketWebsite(staticHostParams, function(err, data) {
      if (err) {
        // display error message
        console.log("Error", err);
      } else {
        // update the displayed policy for the selected bucket
        console.log("Success", data);
      }
    });
  };

  res.render('confirmation', 
    { 
      title: 'Global Handle'
    });
  // res.redirect(globalhandleWebsite.globalhandleUrl);
});


module.exports = router;
