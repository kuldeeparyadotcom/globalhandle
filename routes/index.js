var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Global Handle' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('confirmation', { title: 'Global Handle' });
  console.log(req.body.firstname);
  console.log(req.body.lastname);
  console.log(req.body.email);
  console.log(req.body.twitter);
  console.log(req.body.facebook);
  console.log(req.body.linkedin);

  //Call AWS API to create bucket with this data
});

module.exports = router;
