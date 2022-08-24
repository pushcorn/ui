module.exports = function (nit)
{
    return nit.defineClass ("ui.css.CleanCss")
        .field ("options", "object", "The Clean CSS options.")
        .method ("minify", function (css)
        {
            const cls = require ("clean-css");

            let cleanCss = new cls (this.options);

            return cleanCss.minify (css);
        })
    ;
};
