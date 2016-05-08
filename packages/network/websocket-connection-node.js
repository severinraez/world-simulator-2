'use strict'

import BaseConnection from './websocket-connection-base'

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

export default NodeConnection
