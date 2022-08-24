test.command ("ui.commands.CompileJs")
    .should ("compile and minify a JS file")
    .given ("example.js")
    .chdir ("test/resources")
    .returns ("function addOne(n){return n+1}")
    .commit ()
;
