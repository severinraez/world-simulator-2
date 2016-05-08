'use strict'

class BaseConnection {
    constructor(connection) {
        this.connection = connection
        this.messageCallback = null
    }
}

export default BaseConnection
