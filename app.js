var express = require('express');
var app = express();
var path = require('path');
var	 multer = require('multer');
var fs = require('fs');
var watson = require('watson-developer-cloud');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var bodyParser = require('body-parser')
var cfenv = require('cfenv');

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var uploadFolder = "uploads";


var documentConversion = new watson.DocumentConversionV1({
    username: '5a309389-5341-40df-af05-3cbe03a0478e',
    password: '7x5KCUYWCggp',
    version_date: '2015-12-01',
});

var languageTranslator = new LanguageTranslatorV2({
    username: 'a28dd702-d7e0-4eef-a23c-a6629f186af4',
    password: 'WVHL5niyHev0',
    url: 'https://gateway.watsonplatform.net/language-translator/api'	
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


app.post('/api/translate',  function(req, res, next) {	 
	var params = {
			  text: req.body.data,
			  source: 'en',
			  target: 'pt'
	  };		  
		
	  languageTranslator.translate(params, function(err, data) {
	    if (err) {
	    	console.log('err\n');
	    	console.log(err.code);
	    	console.log(err.error);
	    	console.log(err);
	    	
	    	return next(err);
	    } else {
	    	res.json(data);
	    }
	  });
	});

var appEnv = cfenv.getAppEnv();


app.listen(appEnv.port, '0.0.0.0', function() {
	  // print a message when the server starts listening
	  console.log("server starting on " + appEnv.url);
	});

/*
app.listen(3000, function () {
  console.log('Listening on port 3000');
}); */