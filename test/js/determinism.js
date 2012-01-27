function print(text){ console.log(text); }
({modules:[ 

//
// ../program.js
//
function(require, module, exports){ 
var test = require(1);
require(3);
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
// ../submodule/a.js
//
function(require, module, exports){ 
var test = require(1);
var pass = false;
var test = require(1);
try {
    require(4);
} catch (exception) {
    pass = true;
}
test.assert(pass, 'require does not fall back to relative modules when absolutes are not available.')
},

//
// ../a.js
//
,// Module "../a.js" not found.

//
// CoM4 bootstrap
//
0],init:function(){
var boot=this, exports=[], require=function(id){ return exports[id] || void boot.modules[id](require, id ? {id:id} : require.main, exports[id]={}) || exports[id]; };
require.main={id:0};
return require(0);
}}).init();
