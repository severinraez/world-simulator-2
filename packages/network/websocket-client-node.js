'use strict'

import ws from "nodejs-websocket"

import Connection from './websocket-connection-node'
import BaseClient from './websocket-client-base'

class NodeClient extends BaseClient {
    connect() {
        this.connection = ws.connect(this._url())
        this.connection.on('connect', () => {
            let wrappedConnection = new Connection(this.connection)

            this.connectedCallback(wrappedConnection)
        })
    }
}

export default NodeClient
