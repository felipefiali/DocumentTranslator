var express = require('express');
var app = express();
var path = require('path');
var	 multer = require('multer');
var fs = require('fs');

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var uploadFolder = "uploads";

var watson = require('watson-developer-cloud');


var documentConversion = new watson.DocumentConversionV1({
    username: '5a309389-5341-40df-af05-3cbe03a0478e',
    password: '7x5KCUYWCggp',
    version_date: '2015-12-01',
});

var upload = multer({
	  storage: multer.diskStorage({
	    destination(req, file, cb) {
	      cb(null, uploadFolder);
	    },
	    filename(req, file, cb) {	      
	      cb(null, `${Date.now()}-${file.originalname}`);
	    },
	  }),
	});

app.post('/upload', upload.single('document'), (req, res, next) => {
	if (!req.file && !req.file.path) {
	    return next({
	      error: 'Missing required parameter: file',
	      code: 400,
	    });
	  }
	  res.json({
	    documentId: req.file.filename,
	  });	  
	});


app.get('/api/convert', (req, res, next) => {
	  var file = path.join(uploadFolder, req.query.documentId);
	  var params = {
			  conversion_target: 'NORMALIZED_TEXT',
			  file: file ? fs.createReadStream(file) : null
	  };	   

	  documentConversion.convert(params, (err, response) => {
	    if (err) {
	      return next(err);
	    } else {
	    	res.send(response);
	    }
	  });
	});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});