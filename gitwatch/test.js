var rekuire = require(__dirname + '/rekuire.js');
var tinytest = rekuire('tinytest');
var testFiles = ['batchExecTest'];
testFiles.forEach(function(jsfile){
  rekuire(jsfile)(tinytest);
});
