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
    "devtool": 'eval'
}
