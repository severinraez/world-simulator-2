'use strict'

global.expect = require('chai').expect

/* With growing complexity this list should be automatically generated.
 Just globbing over the files and require them here won't work because it
 confuses webpack. */

require('./packages/network/test/websocket-integrationtest')