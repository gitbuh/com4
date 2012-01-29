function print(text) { console.log(text); }
({modules: [

//
// ../program.js
//
function(require,module,exports){
var test = require(1);
var a = require(3);
var foo = a.foo;
test.assert(a.foo() == a, 'calling a module member');
test.assert(foo() == (function (){return this})(), 'members not implicitly bound');
a.set(10);
test.assert(a.get() == 10, 'get and set')
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
exports.foo = function () {
    return this;
};
exports.set = function (x) {
    this.x = x;
};
exports.get = function () {
    return this.x;
};
exports.getClosed = function () {
    return exports.x;
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
