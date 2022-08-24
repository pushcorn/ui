module.exports = function (nit)
{
    return nit.defineClass ("ui.css.Compiler")
        .require ("ui.css.PostCss")

        .field ("[plugins...]", "ui.css.PostCss.Plugin", "The PostCSS plugins to use.",
        [
            "postcss-nested",
            "postcss-nested-ancestors",
            "postcss-color-function",
            "autoprefixer",
            {
                name: "postcss-custom-properties",
                options:
                {
                    preserve: false
                }
            }
        ])
        .method ("compile", async function (css)
        {
            css = await nit.new ("ui.css.PostCss", { plugins: this.plugins }).transform (css);
            css = await nit.new ("ui.css.StyleFmt").format (css);

            return css;
        })
    ;
};
