// 
//  Packaged by CoM4
//
//  Main: program
//  User: owner 
//  Node: vaio-fs
//  Date: Sat Feb  4 05:16:44 EST 2012
//
//  Minify this script before deploying. 
//  See http://code.google.com/closure/compiler/
//

//
//  CoM4 bootstrap
//
(function (m) {
    function r(n) {
        var f = m[n];
        return f.e || void f(r, n ? {id: n} : r.main, f.e = {}) || f.e;
    }
    r.main = {id: 0};
    return r(0);
}([
function (require, module, exports) {
//
//  Module 0: ../program.js (main module)
//
var a = require(1);
var test = require(2);
test.assert(exports.monkey == 10, 'monkeys permitted');
test.print('DONE', 'info');

//  Module 0 EOF
}, 
function (require, module, exports) {
//
//  Module 1: ../a.js 
//
require(0).monkey = 10;

//  Module 1 EOF
}, 
function (require, module, exports) {
//
//  Module 2: ../test.js 
//

exports.print = typeof print !== "undefined" ? print : function () {
    var system = require(-1);
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


//  Module 2 EOF
}]));
