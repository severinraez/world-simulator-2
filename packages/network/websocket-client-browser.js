'use strict'

const Connection = require("./websocket-connection-browser").klass
const BaseClient = require("./websocket-client-base").klass

class BrowserClient extends BaseClient {
    connect() {
        this.connection = new WebSocket(this._url())

        this.connection.onopen = () => {
            let wrappedConnection = new Connection(this.connection)
            
            this.connectedCallback(wrappedConnection)
        }
    }
}

define({klass: BrowserClient})
