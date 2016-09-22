
var express = require('express');
var app = express();
var open = require('open');
var bodyParser = require('body-parser');

var foo = require('./server/server.js');

var port = process.env.PORT || 3000,
	root = '127.0.0.1',
	url = [root, port].join(':');

app.use(bodyParser.json());

app.all('/server/contact-us', function(req, res){
	var promise;
	// res.sendStatus('200');
	foo.contactUsResponseReceiver(req.body).then(function(response){
		if(response.message){
			console.log(response.message)
		}
		res.status(200).send({'response': 'recaptcha was valid, email was sent', value: true});
	}).catch(function(response){
		if(response.message){
			console.log(response.message)
		}
		res.status(200).send({'response':'recaptcha was invalid.', value: false});
	})
})

app.use(express.static(__dirname ));

app.all('/*', function (req, res) {
   	res.sendFile('index.html', { root: __dirname });
})

app.listen(port);
open(url);
