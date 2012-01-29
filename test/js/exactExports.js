function print(text) { console.log(text); }
({modules: [

//
// ../program.js
//
function(require,module,exports){
var test = require(1);
var a = require(3);
test.assert(a.program() === exports, 'exact exports');
test.print('DONE', 'info');
},

//
// ../test.js
//
function(require,module,exports){

exports.print = typeof print !== "undefined" ? print : function () {
    var system = require(2);
    var stdio = system.stdio;
    stdio.print.apply(stdio, arguments);
};

exports.assert = function (guard, message) {
    if (guard) {
        exports.print('PASS ' + message, 'pass');
    } else {
        exports.print('FAIL ' + message, 'fail');
    }
};

},

//
// ../system.js
//
0,// Module "../system.js" not found.

//
// ../a.js
//
function(require,module,exports){
exports.program = function () {
    return require(0);
};
},

//
// CoM4 bootstrap
//
0],init:function(){
var boot=this, exports=[], require=function(id) { var fn=boot.modules[id]; return exports[id] || void fn(require, id ? {id:id} : require.main, exports[id]={}) || exports[id]; };
require.main={id:0};
return require(0);
}}).init();
