'use strict'

/* Contains Details of the test case setup that are shared between
   node.js and the browser dummy client. */

const WEBSOCKET_PORT = 50432

const SERVER_HELLO_MESSAGE = 'hello from server'
const CLIENT_HELLO_MESSAGE = 'hello from client'
const CLIENT_FAIL_MESSAGE = 'fail from client'

let replyToHello = (connection) => {
    connection.onMessage((message) => {
        if(message.msg == SERVER_HELLO_MESSAGE) {
            connection.send({ msg: CLIENT_HELLO_MESSAGE }) }
        else {
            connection.send({ msg: CLIENT_FAIL_MESSAGE })
        }
    })
}


export default {
    WEBSOCKET_PORT: WEBSOCKET_PORT,

    SERVER_HELLO_MESSAGE: SERVER_HELLO_MESSAGE,
    CLIENT_HELLO_MESSAGE: CLIENT_HELLO_MESSAGE,
    CLIENT_FAIL_MESSAGE: CLIENT_FAIL_MESSAGE,

    replyToHello: replyToHello
}
