"use strict";

//fixes ignored "use strict" statements in sources.
//workaround for https://github.com/webpack/webpack/issues/1970 found on
//https://gist.github.com/mastercactapus/05da17090e4a49d23173
var ConcatSource = require("webpack-sources").ConcatSource;

class StrictPlugin {
    constructor(options){
        this.options = options;
    }
    apply(compiler) {
        compiler.plugin("compilation", compilation=>{
            compilation.moduleTemplate.plugin("render", (moduleSource, module, chunk, dependencyTemplates)=>{
                if (module.resource && module.resource.startsWith(this.options.root)) {
                    return new ConcatSource("\"use strict\";\n", moduleSource);
                }
                return moduleSource;
            });
            compilation.moduleTemplate.plugin("hash", hash=>{
                hash.update("StrictPlugin");
                hash.update("1");
            });
        });
    }
}

module.exports = {
    "context": __dirname,
    "entry": {
        "client": "./client",
        "server": "./server",
        "testing": "./tests"
    },
    "output": {
        "path": __dirname + "/dist",
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].bundle.js"
    },
    "devtool": 'eval',
    plugins: [
        new StrictPlugin({ root: __dirname+"/packages" })
    ],
    resolve: {
        modulesDirectories: [__dirname + '/webpack_namespace_extension', // make require('packages/xy') work
                             'node_modules'] 
    }
}
