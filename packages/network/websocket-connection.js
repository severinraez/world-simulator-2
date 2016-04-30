'use strict'

class Connection {
    constructor(connection) {
        this.connection = connection
        this.messageCallback = null
    }

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

define({klass: Connection})
