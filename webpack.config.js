module.exports = {
    "context": __dirname,
    "entry": {
        "client": "./client",
        "server": "./server"
    },
    "output": {
        "path": __dirname + "/dist",
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].bundle.js"
    },
    "devtool": 'eval'
}
