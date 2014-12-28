(function(global) {
  "use strict";
  if ("process" in global) {
    var rekuire = function(libname) {
      if(libname.indexOf('.js') != -1) libname += '.js';
      return require(__dirname + '/' + libname);
    };
    module.exports = rekuire;
  }
})((this || 0).self || global);
