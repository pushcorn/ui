test.method ("ui.css.Compiler", "compile")
    .should ("compile the CSS content")
    .given (nit.readFile ("test/resources/example.css"))
    .returns (`div.highlighted a {
  color: red;
}
`)
    .commit ()
;
