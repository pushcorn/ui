module.exports = function (nit)
{
    return nit.defineClass ("ui.js.UglifyJs")
        .m ("error.process_failure", "%{message}. (file: %{filename}, line: %{line}, col: %{col}, pos: %{pos})")
        .field ("options", "object", "The uglify-js options.")
        .method ("minify", function (js)
        {
            const uglifyJs = require ("uglify-js");

            let { error, code } = uglifyJs.minify (js, this.options);

            if (error)
            {
                this.throw ("error.process_failure", error);
            }

            return code;
        })
    ;
};
