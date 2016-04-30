'use strict'

const Client = require('../../websocket-client-browser.js').klass
const caseDetails = require('../case-details')

const PORT = 50432

window.addEventListener("load", () => {
    let client = new Client('localhost', caseDetails.WEBSOCKET_PORT)

    client.onConnected((connection) => {
        console.log('connected')

        caseDetails.replyToHello(connection)
    })

    console.log('connecting')

    client.connect()
})
