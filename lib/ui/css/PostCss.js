module.exports = function (nit)
{
    return nit.defineClass ("ui.css.PostCss")
        .defineInnerClass ("Plugin", Plugin =>
        {
            Plugin
                .field ("<name>", "string", "The plugin name.")
                .field ("options", "object", "The plugin options.")
                .method ("load", function ()
                {
                    return require (this.name) (this.options);
                })
            ;
        })

        .field ("[plugins...]", "ui.css.PostCss.Plugin", "The PostCSS plugins to use.")
        .field ("options", "object", "The PostCSS options.",
        {
            defval: { from: undefined }
        })

        .method ("transform", async function (css)
        {
            const postcss = require ("postcss");
            const { options, plugins } = this;

            return (await postcss (plugins.map (p => p.load ())).process (css, options)).css;
        })
    ;
};
