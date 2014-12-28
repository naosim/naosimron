/*global global: false, module: false */
(function(global) {
  var Logger = function() {
    "use strict";
    var COLOR = {
      RED:  '\u001b[31m',
      RESET: '\u001b[0m'
    };
    var str = function(num, bit) {
      bit = bit || 2;
      num = '' + num;
      while(num.length < bit) num = '0' + num;
      return num;
    };

    // ex [2014/12/28 22:02:58.757]
    var getDate = function() {
      var d = new Date();
      var seg = [
      '[',
      d.getYear() + 1900, '/',
      str(d.getMonth() + 1), '/',
      str(d.getDate()), ' ',
      str(d.getHours()), ':',
      str(d.getMinutes()), ':',
      str(d.getSeconds()), '.',
      str(d.getMilliseconds(), 3),
      ']'
      ];
      var result = '';
      for(var i = 0; i < seg.length; i++) result += seg[i];
      return result;
    };

    var putDate = function(args) {
      var result = [getDate()];
      for(var i = 0; i < args.length; i++) result[i + 1] = args[i];
      return result;
    };
    var putColor = function(color, args) {
      var result = [color + args[0]];
      for(var i = 1; i < args.length; i++) {
        result[i] = args[i];
      }
      result[result.length] = COLOR.RESET;
      return result;
    };
    return {
      log: function() {
        console.log.apply(console, putDate(arguments));
      },
      error: function() {
        console.error.apply(console, putColor(COLOR.RED, putDate(arguments)));
      }
    };
  };

  var logger = Logger();
  if ("process" in global) {
    module.exports = logger;
  }
  global["logger"] = logger;

  logger.log("normal");
  logger.error("error");

})((this || 0).self || global);
