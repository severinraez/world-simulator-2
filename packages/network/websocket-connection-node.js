'use strict'

const BaseConnection = require('./websocket-connection-base.js').klass

class NodeConnection extends BaseConnection {
    onMessage(callback) {
        this.messageCallback = callback
        this.connection.on('text', (str) => {
            this.messageCallback(JSON.parse(str))
        })
    }

    send(message) {
        this.connection.sendText(JSON.stringify(message))
    }
}

define({klass: NodeConnection})
