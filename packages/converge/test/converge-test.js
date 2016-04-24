'use strict'

let expect = require('chai').expect

let converge = require('../converge.js')

describe('replication', function () {
    before(function() {
    })

    describe('primitive values', function() {
        let verify = function (data, delta, expected) {
            let processed = converge.applyDelta(data, delta)

            expect(processed).to.equal(expected)
        }

	      it('adds keys', function() {
            verify({}, {foo: 'bar'}, {foo: 'bar'})
	      })
	      it('overrides values', function () {
            verify({foo: 'bar'}, {foo: 'bar2'}, {foo: 'bar2'})
	      })
	      it('removes keys', function() {
            verify({foo: 'bar'}, {$remove: ['foo']}, {})
	      })
    })

    describe('nested values', function() {
        it('adds nested values', function() {
            verify({}, {parent: { child: 'value'}}, {parent: { child: 'value'}})
        })
    })

    describe('arrays', function() {
        describe('$idx' , function() {
            it('single-dimensional manipulation', function() {
                verify({ a: [1, 2]}, { a: {$idx: [0, 'changed']}},
                       { a: ['changed', 2]})
                verify({ a: [1, 2]}, { a: {$idx: [0, 'changed', 1, 'changed2']}},
                       { a: ['changed', 'changed2']})
            })

            it('multi-dimensional manipulation', function() {
                verify({ a: [[1, 2], [3, 4]] },
                       { a: { $idx: { dim: 2, delta: [0, 0, 'changed'] }}},
                       { a: [['changed', 1], [3, 4]]})
                verify({ a: [[1, 2], [3, 4]] },
                       { a: { $idx: { dim: 2, delta: [0, 0, 'changed', 1, 0, 'changed2'] }}},
                       { a: [['changed', 1], ['changed2', 4]]})
            })
        })
    })
})


