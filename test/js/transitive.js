// 
//  Packaged by CoM4
//
//  Main: program
//  User: owner 
//  Node: vaio-fs
//  Date: Sat Feb  4 05:16:45 EST 2012
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
var test = require(1);
test.assert(require(2).foo() == 1, 'transitive');
test.print('DONE', 'info');

//  Module 0 EOF
}, 
function (require, module, exports) {
//
//  Module 1: ../test.js 
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


//  Module 1 EOF
}, 
function (require, module, exports) {
//
//  Module 2: ../a.js 
//
exports.foo = require(3).foo;

//  Module 2 EOF
}, 
function (require, module, exports) {
//
//  Module 3: ../b.js 
//
exports.foo = require(4).foo;

//  Module 3 EOF
}, 
function (require, module, exports) {
//
//  Module 4: ../c.js 
//
exports.foo = function () {
    return 1;
};

//  Module 4 EOF
}]));
