test.command ("ui.commands.CompileCss")
    .should ("compile a CSS file")
    .given ("example.css")
    .chdir ("test/resources")
    .returns (`div.highlighted a {
    color: red;
}
`)
    .commit ()

    .can ("also minify the CSS")
    .given ("example.css", { minify: true })
    .chdir ("test/resources")
    .returns (`div.highlighted a{color:red}`)
    .commit ()
;
