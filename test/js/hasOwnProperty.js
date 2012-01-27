function print(text){ console.log(text); }
({modules:[ 

//
// ../program.js
//
function(require, module, exports){ 
var hasOwnProperty = require(1);
var toString = require(2);
var test = require(3);
test.print('DONE', 'info');
},

//
// ../hasOwnProperty.js
//
function(require, module, exports){ 
},

//
// ../toString.js
//
function(require, module, exports){ 
},

//
// ../test.js
//
function(require, module, exports){ 

exports.print = typeof print !== "undefined" ? print : function () {
    var system = require(4);
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
// CoM4 bootstrap
//
0],init:function(){
var boot=this, exports=[], require=function(id){ return exports[id] || void boot.modules[id](require, id ? {id:id} : require.main, exports[id]={}) || exports[id]; };
require.main={id:0};
return require(0);
}}).init();
