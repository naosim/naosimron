var rekuire = require(__dirname + '/rekuire.js');
var express = require('express');
var app = express();
var fs = require('fs');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');
var logger = rekuire('logger');

app.use(bodyParser.urlencoded({ extended: false }));
app.all('/ctrl/*', basicAuth(function(user, password) {
  return user === 'user' && password === 'pass' + new Date().getDate();
}));

app.get('/', function (req, res) {
  res.send('Hello, World!');
});
app.get('/ctrl/deploy', function (req, res) {
  deploy();
  res.send('deploy!');
});
app.post('/webhook/', function (req, res) {
  var body = JSON.parse(req.body.payload);
  webhook(body);
  res.send('thank you.');
});
app.listen(3000);

var deploy = function() {
  if(dayAccessCount.isLocked()) {
    logger.error('deploy locked!');
    return;
  }
  dayAccessCount.up();
  logger.log('deploy');
  var child = exec('sh deploy_force.sh', function(err, stdout, stderr) {
    if (!err) {
      logger.log('stdout: ' + stdout);
      logger.log('stderr: ' + stderr);
    } else {
      logger.log(err);
      // err.code will be the exit code of the child process
      logger.log(err.code);
      // err.signal will be set to the signal that terminated the process
      logger.log(err.signal);
    }
  });
};

var webhook = function(body) {
  var validReositoryName = function(body) {
    return body.repository.full_name == 'naosim/naosimron';
  };
  var hasCommit = function(body) {
    return body.commits;
  };

  if(!validReositoryName(body) || !hasCommit(body)) return;

  logger.log('push arrived');
  var child = exec('sh deploy_if_updated.sh', function(err, stdout, stderr) {
    if (!err) {
      logger.log('success');
      logger.log('stdout: ' + stdout);
      logger.log('stderr: ' + stderr);
    } else {
      logger.log('error');
      logger.log(err);
      // err.code will be the exit code of the child process
      logger.log(err.code);
      // err.signal will be set to the signal that terminated the process
      logger.log(err.signal);
    }
  })

};

var dayAccessCount = (function(max) {
  var currentDay, count;
  var isDayChanged = function() { return currentDay != new Date().getDay(); };
  var reset = function() {
    currentDay = new Date().getDay();
    count = 0;
  };
  reset();
  return {
    up: function() {
      if(isDayChanged()) reset();
      count++;
    },
    count: function() {
      if(isDayChanged()) reset();
      return count;
    },
    isLocked: function() {
      return this.count() >= max;
    }

  }
})(5);
