function print(text){ console.log(text); }
({modules:[ 

//
// ../program.js
//
function(require, module, exports){ 
var test = require(1);
var a = require(3);
var b = require(4);

test.assert(a.a, 'a exists');
test.assert(b.b, 'b exists')
test.assert(a.a().b === b.b, 'a gets b');
test.assert(b.b().a === a.a, 'b gets a');

test.print('DONE', 'info');
},

//
// ../test.js
//
function(require, module, exports){ 

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
,// Module "../system.js" not found.

//
// ../a.js
//
function(require, module, exports){ 
exports.a = function () {
    return b;
};
var b = require(4);
},

//
// ../b.js
//
function(require, module, exports){ 
var a = require(3);
exports.b = function () {
    return a;
};
},

//
// CoM4 bootstrap
//
0],init:function(){
var boot=this, exports=[], require=function(id){ return exports[id] || void boot.modules[id](require, id ? {id:id} : require.main, exports[id]={}) || exports[id]; };
require.main={id:0};
return require(0);
}}).init();