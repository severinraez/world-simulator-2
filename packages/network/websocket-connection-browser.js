'use strict'

import BaseConnection from './websocket-connection-base'

class BrowserConnection extends BaseConnection {
    onMessage(callback) {
        this.messageCallback = callback
        this.connection.onmessage = (event) => {
            this.messageCallback(JSON.parse(event.data))
        }
    }

    send(message) {
        this.connection.send(JSON.stringify(message))
    }
}

export default BrowserConnection

