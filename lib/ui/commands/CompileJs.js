module.exports = function (nit)
{
    return nit.defineCommand ("ui.commands.CompileJs")
        .describe ("Compile a JavaScript file with UglifyJs.")
        .defineInput (Input =>
        {
            Input
                .option ("<source>", "nit.File", "The JavaScript file to be compiled.")
            ;
        })
        .method ("run", async function (ctx)
        {
            const { source } = ctx.input;

            let js = source.read ();
            let uglifyJs = nit.new ("ui.js.UglifyJs");

            return uglifyJs.minify (js);
        })
    ;
};
