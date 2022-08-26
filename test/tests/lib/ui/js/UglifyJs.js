test.method ("ui.js.UglifyJs", "minify")
    .should ("minify the given JavaScript")
    .given (nit.readFile ("test/resources/example.js"))
    .returns ("function addOne(n){return n+1}")
    .commit ()

    .should ("throw if the JavaScript is invalid")
    .given (nit.readFile ("test/resources/example.js") + "}}")
    .throws ("error.process_failure")
    .commit ()

    .should ("keep the func arg names if /* @keep_fargs */ was added before the func decl")
    .given ("/* @keep_fargs */ function test (nit, app) {}")
    .returns ("function test(nit,app){}")
    .commit ()

    .should ("keep the func arg names if /* @keep_fargs */ was added after the function keyword")
    .given ("function /* @keep_fargs */ test (nit, app) {}")
    .returns ("function test(nit,app){}")
    .commit ()

    .should ("keep the func arg names if /* @keep_fargs */ was added before func arg decl")
    .given ("function test (/* @keep_fargs */ nit, app) {}")
    .returns ("function test(nit,app){}")
    .commit ()

    .should ("keep the func arg names if /* @keep_fargs */ was added after func arg decl")
    .given ("function test (nit, app /* @keep_fargs */) {}")
    .returns ("function test(nit,app){}")
    .commit ()

    .should ("keep the func arg names if /* @keep_fargs */ was added after func arg decl")
    .given ("module.exports = function (nit, app /* @keep_fargs */) {};")
    .returns ("module.exports=function(nit,app){};")
    .commit ()
;
