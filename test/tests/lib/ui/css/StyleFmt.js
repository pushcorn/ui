test.method ("ui.css.StyleFmt", "format")
    .should ("format the CSS content")
    .given (`     a       { color:
    red; }`)
    .returns (`a {
  color: red;
}`)
    .commit ()
;
