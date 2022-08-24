module.exports = function (nit)
{
    return nit.defineCommand ("ui.commands.CompileCss")
        .describe ("Compile a CSS file with PostCSS.")
        .defineInput (Input =>
        {
            Input
                .option ("<source>", "nit.File", "The CSS file to be compiled.")
                .option ("minify", "boolean", "Whether to minify the result.")
            ;
        })
        .method ("run", async function (ctx)
        {
            const { source, minify } = ctx.input;

            let css = source.read ();
            let compiler = nit.new ("ui.css.Compiler");

            css = await compiler.compile (css);

            if (minify)
            {
                css = nit.new ("ui.css.CleanCss").minify (css).styles;
            }

            return css;
        })
    ;
};
