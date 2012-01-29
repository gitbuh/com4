function print(text) { console.log(text); }
({modules: [

//
// ../program.js
//
function(require,module,exports){
var test = require(1);
test.assert(require(3).foo() == 1, 'transitive');
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
exports.foo = require(4).foo;
},

//
// ../b.js
//
function(require,module,exports){
exports.foo = require(5).foo;
},

//
// ../c.js
//
function(require,module,exports){
exports.foo = function () {
    return 1;
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
