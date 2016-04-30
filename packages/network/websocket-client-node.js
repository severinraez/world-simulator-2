'use strict'

const ws = require("nodejs-websocket")

const Connection = require("./websocket-connection").klass

class NodeClient {
    constructor(host, port) {
        this.host = host
        this.port = port

        this.connectedCallback = null
        this.connection = null
    }

    onConnected(callback) { this.connectedCallback = callback }

    connect() {
        this.connection = ws.connect(this._url())
        this.connection.on('connect', () => {
            let wrappedConnection = new Connection(this.connection)

            this.connectedCallback(wrappedConnection)
        })
    }

    _url() {
        return 'ws://' + this.host + ':' + this.port + '/'
    }
}

define({klass: NodeClient})
