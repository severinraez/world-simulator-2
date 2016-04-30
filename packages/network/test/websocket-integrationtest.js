const Server = require('packages/network/websocket-server').klass
const NodeClient = require('packages/network/websocket-client-node').klass

describe('network/websocket', () => {

    const PORT = 50432

    const SERVER_HELLO_MESSAGE = 'hello from server'
    const CLIENT_HELLO_MESSAGE = 'hello from client'
    const CLIENT_FAIL_MESSAGE = 'fail from client'

    let setupServer = (connectionCallback) => {
        this.messages = []

        let server = new Server(PORT)

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

    let verifyCommunication = (connection, done) => {
        connection.send({msg: SERVER_HELLO_MESSAGE})

        connection.onMessage((message) => {
            expect(message.msg).to.equal(CLIENT_HELLO_MESSAGE)

            done()
        })
    }

    describe('node.js server, node.js client', function() {

        it('connects and exchanges messages', function(done) {
            let client = new NodeClient('localhost', PORT)

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
        return
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

