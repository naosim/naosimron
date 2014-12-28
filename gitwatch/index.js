var express = require('express');
var app = express();
var fs = require('fs');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');

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

var logger = (function() {
  var str = function(num) { return num >= 10 ? '' + num : '0' + num}
  var getDate = function() {
    var d = new Date();
    var seg = [
      '[',
      d.getYear() + 1900, '/',
      str(d.getMonth() + 1), '/',
      str(d.getDate()), ' ',
      str(d.getHours()), ':',
      str(d.getMinutes()), ':',
      str(d.getSeconds()),
      ']'
    ];
    var result = '';
    for(var i = 0; i < seg.length; i++) result += seg[i];
    return result;
  }

  var putDate = function(args) {
    var result = [getDate()];
    for(var i = 0; i < args.length; i++) {
      result[i + 1] = args[i];
    }
    return result;
  }
  return {
    log: function() {
      console.log.apply(console, putDate(arguments));
    },
    error: function() {
      console.error.apply(console, putDate(arguments));
    }
  }
})();
