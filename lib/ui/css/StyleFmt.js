module.exports = function (nit)
{
    return nit.defineClass ("ui.css.StyleFmt")
        .field ("options", "object", "The stylefmt options.")

        .method ("format", async function (css)
        {
            let postCss = nit.new ("ui.css.PostCss",
            {
                plugins:
                [
                {
                    name: "stylefmt",
                    options: this.options
                }
                ]
            });

            return await postCss.transform (css);
        })
    ;
};
