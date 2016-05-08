'use strict'

import Client from '../../websocket-client-browser.js'
import caseDetails from'../case-details'

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
