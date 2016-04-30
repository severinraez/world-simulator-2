'use strict'

class BaseConnection {
    constructor(connection) {
        this.connection = connection
        this.messageCallback = null
    }
}

define({klass: BaseConnection})
