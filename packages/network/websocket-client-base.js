'use strict'

class BaseClient {
    constructor(host, port) {
        if(new.target == BaseClient) {
            throw new TypeError("Cannot construct BaseClient instances directly");
        }

        this.host = host
        this.port = port

        this.connectedCallback = null
        this.connection = null
    }

    onConnected(callback) { this.connectedCallback = callback }

    _url() {
        return 'ws://' + this.host + ':' + this.port + '/'
    }
}

define({klass: BaseClient})
