test.object ("ui.css.PostCss")
    .should ("be able to transform CSS content with PostCSS")
    .given ("postcss-nested")
    .expectingMethodToReturnValue ("result.transform", nit.readFile ("test/resources/example.css"), `div.highlighted a {
        color: red;
    }
`)
    .commit ()
;
