test.method ("ui.js.UglifyJs", "minify")
    .should ("minify the given JavaScript")
    .given (nit.readFile ("test/resources/example.js"))
    .returns ("function addOne(n){return n+1}")
    .commit ()

    .should ("throw if the JavaScript is invalid")
    .given (nit.readFile ("test/resources/example.js") + "}}")
    .throws ("error.process_failure")
    .commit ()
;
