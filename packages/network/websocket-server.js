const ws = require("nodejs-websocket")

const Connection = require("./websocket-connection").klsdd

const DEFAULT_PORT = 8001

class Server {
    constructor(options) {
        this.port = options.port || DEFAULT_PORT
        this.connectionCallback = null
        this.server = null
    }

    onConnection(callback) { this.connectionCallback = callback }

    listen() {
        if(this.connectionCallback == null) {
            throw Error.new("Set connection callback by using onConnection() before calling listen()")
        }

        this.server = ws.createServer((connection) => {
            let wrappedConnection = new Connection(connection)
            this.connectionCallback(wrappedConnection)
        })

        this.server.listen(this.port)
    }
}

define({klass: Server})
