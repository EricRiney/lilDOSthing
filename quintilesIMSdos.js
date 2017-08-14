// lil DOS attack thing

var http = require('http'); // grab what I need
var async = require('async');

// Declare the options that are gonna be sent
var options = {
  hostname: '127.0.0.1',
  port: 9090,
  path: '/',
  method: 'GET'
};

// Build the request wrapper that we're 
// gonna be sending the options in
function sendRequestWrapper(n, done) {
  console.log('Totally calling sendRequest', n);
  sendRequest(options, function(err){
    done(err);
  });
};

// Send request
function sendRequest(options, callback) {
  var start = new Date();
  var req = http.request(options,function(res) {
    console.log('Request took:', new Date() - start, 'ms');
    callback(null);
  });
  req.on('error', function(e) {
    console.log('Like, might be problem with request: ' + e.message);
    callback(e);
  });
  req.end();
};

// Attack!
// Increase number to increase frequency of attack
async.timesSeries(1001, sendRequestWrapper);
