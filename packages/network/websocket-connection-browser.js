'use strict'

const BaseConnection = require('./websocket-connection-base.js').klass

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

define({klass: BrowserConnection})
