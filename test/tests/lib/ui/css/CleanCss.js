test.method ("ui.css.CleanCss", "minify")
    .should ("minify the CSS content")
    .given (`
a {
    color: red;
}
`)
    .returnsInstanceOf (Object)
    .expectingPropertyToBe ("result.styles", "a{color:red}")
    .commit ()
;
