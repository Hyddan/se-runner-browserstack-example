var http = require('http');

var agent;
if(process.version.substring(0,5) == 'v0.10'){
  var AgentKeepAlive = require('agentkeepalive');
  agent = new AgentKeepAlive({
    keepAliveTimeout: 30*1000
  });
}
else {
  var agent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 30*1000
  });
}

var httpRequest = http.request;
http.request = function (options, callback) {
  options["agent"] = agent;
  
  return httpRequest(options, callback);
};