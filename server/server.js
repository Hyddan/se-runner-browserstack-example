var express = require('express'),
        application = express(),
        http = require('http'),
        fs = require('fs'),
        port = 9999,
        addCORSHeaders = function(request, response, contentLength) {
            response.header({
                'Content-Length': contentLength || 0,
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': request.header('Origin') || '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': 'Authorization, Content-Length, Content-Type, Origin, X-CustomData'
            });
        };

application.get('/', function (request, response) {
    response.sendFile('./harness.html', { root: __dirname });
});

application.options('/', function (request, response) {
	addCORSHeaders(request, response, 0);
	
	response.send(200);
});

application.use('/', express.static('./', { root: __dirname }));

http.createServer(application)
        .listen(port);

console.log('Local Web Server started, listening on port ' + port);