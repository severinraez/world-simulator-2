const Server = require('packages/network/websocket-server').klass
const NodeClient = require('packages/network/websocket-client-node').klass

const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;

const caseDetails = require('packages/network/test/case-details')

describe('network/websocket', () => {

    let setupServer = (connectionCallback) => {
        this.messages = []

        let server = new Server(caseDetails.WEBSOCKET_PORT)

        server.onConnection((connection) => {
            connectionCallback(connection)
        })

        server.listen()

        return server
    }

    let verifyCommunication = (connection, done) => {
        connection.send({msg: caseDetails.SERVER_HELLO_MESSAGE})

        connection.onMessage((message) => {
            expect(message.msg).to.equal(caseDetails.CLIENT_HELLO_MESSAGE)

            done()
        })
    }

    describe('node.js server, node.js client', function() {

        it('connects and exchanges messages', (done) => {
            let client = new NodeClient('localhost', caseDetails.WEBSOCKET_PORT)

            client.onConnected((connection) => {
                caseDetails.replyToHello(connection)
            })

            this.server = setupServer((connection) => {
                verifyCommunication(connection, done)
            })

            client.connect()
        })

        afterEach(() => {
            this.server.close()
        })
    })

    describe('node.js server, browser client', function() {
        const WEBPACK_DEV_SERVER_PORT = 8080

        this.timeout(5000)

        let startWebserver = (callback) => {
            let webRoot = 'packages/network/test/client'

            this.webserver = spawn('webpack-dev-server',
                                   ['--config', 'webpack.config.js'],
                                   { cwd: webRoot })
            let waiting = true;
            this.webserver.stdout.on('data', (data) => {
                // Left for debugging.
                //console.log('webpack-dev-server stdout', data.toString())

                if(!waiting) {
                    return
                }

                let output = data.toString()

                let compilationFailed = output.match("ERROR")
                if(compilationFailed) {
                    throw new Error ("Compilation failed while starting webpack-dev-server, output follows\n" + output)
                }

                let serverReady = output.match("VALID")
                if(serverReady) {
                    waiting = false
                    callback() }
            })
        }

        let killWebserver = () => {
            if(this.webserver) {
                this.webserver.kill()
            }
        }

        let startBrowser = () => {
            this.browser = spawn('google-chrome', ['--incognito', 'http://localhost:' + WEBPACK_DEV_SERVER_PORT])
        }

        let killBrowser = () => {
            if(this.browser) {
                this.browser.kill()
            }
        }


        it('connects and exchanges messages', (done) => {

            this.server = setupServer((connection) => {
                verifyCommunication(connection, () => {
                    done()
                })
            })

            startWebserver(startBrowser)
        })

        afterEach(() => {
            this.server.close()

            killBrowser()
            killWebserver()
        })

    })
})
