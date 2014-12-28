/*global global: false, module: false */
var rekuire = require(__dirname + '/rekuire.js');
(function(global) {
  if (!("process" in global)) return;// only node.js

  var COMMAND = {
    DEPLOY_FORCE:      'sh deploy_force.sh',
    DEPLOY_IF_UPDATED: 'sh deploy_if_updated.sh'
  };
  var TARGET_REPOSITORY = 'naosim/naosimron';
  var DEPLOY_LOCK_COUNT = 5;

  /* public methods */
  module.exports = function(exec, logger) {
    exec = exec || require('child_process').exec;
    logger = logger || rekuire('logger');

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
    })(DEPLOY_LOCK_COUNT);

    var execBatch = function(command) {
      var child = exec(command, function(err, stdout, stderr) {
        if (!err) {
          logger.log('stdout: \n' + stdout);
          logger.log('stderr: \n' + stderr);
        } else {
          logger.error(err);
          logger.error(err.code);
          logger.error(err.signal);
        }
      });
    };

    var deploy = function() {
      if(dayAccessCount.isLocked()) {
        logger.error('deploy locked!');
        return;
      }
      dayAccessCount.up();
      logger.log('deploy');
      execBatch(COMMAND.DEPLOY_FORCE);
    };
    var webhook = function(body) {
      var validReositoryName = function(body) {
        return body.repository.full_name == TARGET_REPOSITORY;
      };
      var hasCommit = function(body) { return body.commits; };
      if(!validReositoryName(body) || !hasCommit(body)) return;

      logger.log('push arrived');
      execBatch(COMMAND.DEPLOY_IF_UPDATED);
    };
    return {
      deploy: deploy,
      webhook: webhook
    }
  };
})((this || 0).self || global);
