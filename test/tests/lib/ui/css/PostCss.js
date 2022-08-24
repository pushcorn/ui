test.object ("ui.css.PostCss")
    .should ("be able to transform CSS content with PostCSS")
    .given ("postcss-nested")
    .expectingMethodToReturnValue ("result.transform", `div.highlighted a {
        color: red;
    }
`, nit.readFile ("test/resources/example.css"))
    .commit ()
;
