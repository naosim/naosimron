var rekuire = require('rekuire.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');
var logger = rekuire('logger');

var exec;
if(!process.env.NODE_IGNORE_BATCH) {
  exec = require('child_process').exec;
} else {
  logger.log('## ignore batch mode ##');
  exec = function(command, callback) {
    logger.log('run ' + command);
    callback(false, command + ' OK');
  };
}
var batchExec = rekuire('batchExec')(exec);

var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.all('/ctrl/*', basicAuth(function(user, password) {
  return user === 'user' && password === 'pass' + new Date().getDate();
}));

app.get('/', function (req, res) {
  res.send('Hello, World!');
});
app.get('/ctrl/deploy', function (req, res) {
  batchExec.deploy();
  res.send('deploy!');
});
app.post('/webhook/', function (req, res) {
  var body = JSON.parse(req.body.payload);
  batchExec.webhook(body);
  res.send('thank you.');
});
app.listen(PORT);
logger.log('running at http://localhost:' + PORT);
