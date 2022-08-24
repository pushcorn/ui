module.exports = function (nit, Self)
{
    return (Self = nit.defineClass ("ui.css.Font"))
        .constant ("FORMATS",
        {
            "embedded-opentype": "eot",
            "truetype": "ttf",
            "opentype": "otf",
            "woff": "woff",
            "woff2": "woff2",
            "svg": "svg"
        })
        .constant ("EXTENSIONS", nit.flip (Self.FORMATS))

        .defineInnerClass ("Src", function (Src)
        {
            Src
                .field ("<url>", "string", "The font URL or path.")
                .field ("<format>", "string", "The font format.")
                    .constraint ("choice", nit.keys (Self.FORMATS))
            ;
        })

        .field ("<family>", "string", "The font family name.")
        .field ("<srcs...>", "ui.Font.Src", "The font sources.")
    ;
};
