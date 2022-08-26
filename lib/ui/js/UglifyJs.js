module.exports = function (nit, Self)
{
    return (Self = nit.defineClass ("ui.js.UglifyJs"))
        .k ("unmangleable")
        .m ("error.process_failure", "%{message}. (file: %{filename}, line: %{line}, col: %{col}, pos: %{pos})")
        .field ("options", "object", "The uglify-js options.")

        .staticMethod ("keepFargsVisitor", function (node)
        {
            const { AST_Function, AST_AsyncFunction, AST_SymbolLambda, AST_Arrow, AST_Defun } = Self.uglifyJs;

            if ((node instanceof AST_Function
                    || node instanceof AST_AsyncFunction
                    || node instanceof AST_SymbolLambda
                    || node instanceof AST_Defun
                    || node instanceof AST_Arrow)
                && node.argnames
                && node.argnames.length)
            {
                let comments = [].concat (
                    nit.array (nit.get (node, "start.comments_before")),
                    nit.array (nit.get (node, "start.comments_after")),
                    nit.array (nit.get (node, "end.comments_before")),
                    nit.array (nit.get (node, "end.comments_after"))
                );

                for (let arg of node.argnames)
                {
                    comments = comments.concat (
                        nit.array (nit.get (arg, "start.comments_before")),
                        nit.array (nit.get (arg, "start.comments_after")),
                        nit.array (nit.get (arg, "end.comments_before")),
                        nit.array (nit.get (arg, "end.comments_after"))
                    );
                }

                let keepFargs = nit.arrayUnique (comments, true)
                    .map (c => c.value.trim ())
                    .some (c => c == "@keep_fargs")
                ;

                if (keepFargs)
                {
                    for (let arg of node.argnames)
                    {
                        arg[Self.kUnmangleable] = true;
                    }
                }
            }
        })
        .staticMemo ("uglifyJs", function ()
        {
            const uglifyJs = require ("uglify-js");

            let ast = uglifyJs.parse ("");

            ast.figure_out_scope ();

            let symbolDefPrototype = Object.getPrototypeOf (ast.make_def ({}));
            let originalUnmangleable = symbolDefPrototype.unmangleable;

            symbolDefPrototype.unmangleable = function (options)
            {
                let arg = nit.find (this.orig, (a) => a instanceof uglifyJs.AST_SymbolFunarg);

                if (arg && arg[Self.kUnmangleable])
                {
                    return true;
                }

                return originalUnmangleable.call (this, options);
            };

            return uglifyJs;
        })
        .method ("minify", function (js)
        {
            const { uglifyJs } = Self;

            try
            {
                let ast = uglifyJs.parse (js);

                ast.walk (new uglifyJs.TreeWalker (Self.keepFargsVisitor));

                return uglifyJs.minify (ast, this.options).code;
            }
            catch (e)
            {
                this.throw ("error.process_failure", e);
            }
        })
    ;
};
