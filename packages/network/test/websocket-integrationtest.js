const Server = require('packages/network/websocket-server')
const NodeClient = require('packages/network/websocket-client-node')

describe('network/websocket', () => {

    let setupServer = (connectionCallback) => {
        this.messages = []

        let server = Server.new()

        server.onConnection((connection) => {
            connectionCallback(connection)
        })

        server.listen()
    }

    let replyToHello = (connection) => {
        connection.onMessage((message) => {
            if(message.msg == SERVER_HELLO_MESSAGE) {
                connection.send({ msg: CLIENT_HELLO_MESSAGE }) }
            else {
                connection.send({ msg: CLIENT_FAIL_MESSAGE })
            }
        })
    }

    let verifyCommunication = (connection, done) {
        connection.send({msg: SERVER_HELLO_MESSAGE})

        connection.onMessage(message) {
            expect(message.msg).to.equal(CLIENT_HELLO_MESSAGE)

            done()
        }
    }

    describe('node.js server, node.js client', function() {

        it('connects and exchanges messages', function(done) {
            let SERVER_HELLO_MESSAGE = 'hello from server'
            let CLIENT_HELLO_MESSAGE = 'hello from client'
            let CLIENT_FAIL_MESSAGE = 'fail from client'

            let client = NodeClient.new({ server: 'localhost' })

            client.onConnected((connection) => {
                replyToHello(connection)
            })

            setupServer((connection) => {
                verifyCommunication(connection, done)
            })

            client.connect()
        })
    })

    describe('node.js server, browser client', function() {

        //const Client = require('packages/network/websocket-client-browser')

        let runWebserver = () => {
            // run webpack dev server
        }

        it('connects and exchanges messages', function() {
            setupServer((connection) => {
                verifyCommunication(connection, done)
            })

            runWebserver('./test-server')
            startBrowser()

            killBrowser()
            killWebserver()
        })

    })
})

