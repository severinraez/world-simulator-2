'use strict'

const ws = require("nodejs-websocket")

const Connection = require("./websocket-connection-node").klass
const BaseClient = require("./websocket-client-base").klass

class NodeClient extends BaseClient {
    connect() {
        this.connection = ws.connect(this._url())
        this.connection.on('connect', () => {
            let wrappedConnection = new Connection(this.connection)

            this.connectedCallback(wrappedConnection)
        })
    }
}

define({klass: NodeClient})
