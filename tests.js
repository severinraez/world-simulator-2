'use strict'

import 'source-map-support/register'
import chai from 'chai'

global.expect = chai.expect

/* With growing complexity this list should be automatically generated.
   Simply globbing over the files and import them here won't work because it
   confuses webpack. */

import './packages/converge/test/converge-test'
import './packages/simulation/test/world-test'
