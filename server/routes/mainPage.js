var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('C:/Users/ese/git/HumanDetectionWebServer-choi/views/mainPages.ejs', { port: port });
});

module.exports = router;

