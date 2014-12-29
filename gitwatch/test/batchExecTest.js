var rekuire = require('rekuire.js');

var main = function(tinytest) {
  tinytest = tinytest || rekuire('tinytest');
  var BatchExec = rekuire('batchExec');
  var CountUpExec = function() {
    var execCount = 0;
    return{
      exec: function(command, callback) { execCount++; },
      count: function() { return execCount; }
    };
  };
  var emptyLogger = {log: function(){}, error: function(){}};

  tinytest('batchExec', function(run) {
    run.test('deploy called a lot', function(assert) {
      var countUpExec  = CountUpExec();
      var batchExec = BatchExec(countUpExec.exec, emptyLogger);
      for(var i = 0; i < 10; i++) batchExec.deploy();
      assert.eq(5, countUpExec.count(), "deploy method called 5 if it called a lot");
    });

    run.test('deploy called', function(assert) {
      var countUpExec  = CountUpExec();
      var batchExec = BatchExec(countUpExec.exec, emptyLogger);
      batchExec.deploy();
      assert.eq(1, countUpExec.count(), "deploy called");
    });

    run.test('webhook', function(assert) {
      var countUpExec  = CountUpExec();
      var batchExec = BatchExec(countUpExec.exec, emptyLogger);
      var body = {};
      body.repository = {};
      body.repository.full_name = 'naosim/naosimron';
      body.commits = [];
      batchExec.webhook(body);
      assert.eq(1, countUpExec.count(), "command called");
    });

    run.test('webhook other repository', function(assert) {
      var countUpExec  = CountUpExec();
      var batchExec = BatchExec(countUpExec.exec, emptyLogger);
      var body = {};
      body.repository = {};
      body.repository.full_name = 'naosim/hoge';
      body.commits = [];
      batchExec.webhook(body);
      assert.eq(0, countUpExec.count(), "command not called");
    });

    run.test('webhook no commits', function(assert) {
      var countUpExec  = CountUpExec();
      var batchExec = BatchExec(countUpExec.exec, emptyLogger);
      var body = {};
      body.repository = {};
      body.repository.full_name = 'naosim/naosimron';
      body.commits = null;
      batchExec.webhook(body);
      assert.eq(0, countUpExec.count(), "command not called");
    });
  });
};
module.exports = main;
if(require.main === module) main(); // run directly from Node
