/* global process: false */
var logger = (function(){
  var COLOR = {
    RED:  '\u001b[31m',
    RESET: '\u001b[0m'
  };
  return {
    log: function(){ console.log.apply(console, arguments); },
    error: function() {
      arguments[0] = COLOR.RED + arguments[0];
      arguments[arguments.length - 1] = arguments[arguments.length - 1] + COLOR.RESET;
      console.error.apply(console, arguments);
    },
    COLOR: COLOR
  }
})();
var LARGE  = '-';
var MIDDLE = '  -';
var SMALL  = '    -';

var TestItemManager = function() {
  var testList = [];
  return {
    run: {
      test: function(name, atest) { testList.push({name:name, test: atest}); },
      testAsync: function(name, atest, timeout) {
        testList.push({isAsync: true, name:name, test: atest, timeout: timeout || 500});
      }
    },
    getTestList: function() { return testList; }
  };
};

var Assert = function(callback) {
  var onError = function(errorMsg) {
    if(callback) {
      callback(errorMsg);
    } else {
      throw errorMsg;
    }
  };

  return {
    aTrue: function(flag, msg) {
      msg = msg || '';
      if(flag) return;
      onError(msg + ': param is false');
    },
    eq: function(exp, act, msg) {
      msg = msg || '';
      if(exp == act) return;
      onError(msg + ': ' + exp + ' expected but ' + act);
    }
  };
};

var startNextTest = function(i, memo, onEnd) {
  if(i >= memo.testList.length) {
    onEnd(memo);
    return;
  }
  var testItem = memo.testList[i];
  var logOK = function(testItem) { logger.log(SMALL, testItem.name, 'OK'); };
  var logNG = function(testItem, msg) { logger.error(SMALL, testItem.name, 'NG', msg); };
  var runTestSync = function() {
    try {
      testItem.test(Assert());
      if(!testItem.isFailed) {
        testItem.isFailed = false;// cannot change true to false
        logOK(testItem);
      }
    } catch(e) {
      memo.errorCount++;
      testItem.isFailed = true;
      logNG(testItem, e);
    }
    startNextTest(i + 1, memo, onEnd);
  };

  var runTestAsync = function() {
    var finished = function() {
      testItem.testFinished = true;
      clearTimeout(timeoutId);
      startNextTest(i + 1, memo, onEnd);
    };
    var successFinished = function() {
      if(testItem.testFinished || testItem.isFailed) return;
      testItem.isFailed = false;// cannot change true to false
      logOK(testItem);
      finished();
    };
    var failedFinished = function(msg) {
      if(testItem.testFinished) return;
      memo.errorCount++;
      testItem.isFailed = true;
      logNG(testItem, msg);
      finished();
    };
    try {
      testItem.test(Assert(failedFinished), successFinished);
    } catch(e) {
      failedFinished(e);
    }

    var timeoutId = setTimeout(function() {
      failedFinished('timeout');
    }, testItem.timeout);
  };

  if(!testItem.isAsync) runTestSync();
  else runTestAsync();
};

var runTests = function(label, action, onEnd) {
  label = label || 'TEST';
  var testItemManager = TestItemManager();
  action(testItemManager.run);
  logger.log(LARGE, label);
  logger.log(MIDDLE, 'DETAIL');
  startNextTest(0, {testList: testItemManager.getTestList(), errorCount: 0}, function(memo) {
    var errorCount = memo.errorCount;
    var testList = memo.testList;

    logger.log(MIDDLE, 'RESULT');
    if(errorCount === 0) {
      logger.log(SMALL, 'TEST CLEAR ' + testList.length + '/' + testList.length);
    } else {
      logger.error(SMALL, 'TEST NG', testList.length - errorCount + '/' + testList.length);
      // exit
    }

    onEnd(memo);
  });
};

var tinytest = (function(){
  var current_test_index = 0;
  var tests = [];
  var running = false;
  var all_finished = false;
  var totalErrorCount = 0;
  var totalTestCount = 0;
  var onTestEnd = function(memo) {
    totalErrorCount += memo.errorCount;
    totalTestCount +=  memo.testList.length;

    current_test_index++;
    if(current_test_index < tests.length) {
      running = true;
      runTests(tests[current_test_index].label, tests[current_test_index].action, onTestEnd);
    } else {
      running = false;
      setTimeout(function(){
        if(!running && !all_finished) {
          all_finished = true;
          logger.log('----');
          if(totalErrorCount > 0) {
            logger.log('TEST FAILED', 'total:' + totalTestCount + ', OK: ' + (totalTestCount - totalErrorCount) + ', NG: ' + totalErrorCount);
            process.exit(1);
          } else {
            logger.log('TEST ALL CLEAR!!');
            process.exit(0);
          }
        }
      }, 1);
    }
  };

  return function(label, action) {
    tests.push({label: label, action: action});
    if(!running) {
      running = true;
      runTests(tests[current_test_index].label, tests[current_test_index].action, onTestEnd);
    }
  };
})();
module.exports = tinytest;
