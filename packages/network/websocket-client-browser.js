'use strict'

import Connection from './websocket-connection-browser'
import BaseClient from './websocket-client-base'

class BrowserClient extends BaseClient {
    connect() {
        this.connection = new WebSocket(this._url())

        this.connection.onopen = () => {
            let wrappedConnection = new Connection(this.connection)

            this.connectedCallback(wrappedConnection)
        }
    }
}

export default BrowserClient
