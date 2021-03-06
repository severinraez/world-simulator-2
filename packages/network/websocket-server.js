'use strict'

import ws from 'nodejs-websocket'

import Connection from './websocket-connection-node'

class Server {
    constructor(port) {
        this.port = port
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

    close(callback) {
        this.server.close(callback)
    }
}

export default Server
