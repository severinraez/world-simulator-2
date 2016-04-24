'use strict'

let api = {}

/*
 {} rA { foo: 'bar' }
   -> { foo: 'bar }
 { foo: 'bar' } rA { foo: '2bar' }
   -> { foo: '2bar' }
 { a: ['a','b'] } rA { a: { $idx: [ 1, 'c' ] }
   -> { a: ['a', 'c'] }
 { a: [['a', 'a'], ['b', 'b']] } rA { a: { $idx: { dim: 2, data: [0, 1, 'b'] }
   -> { a: ['a','b'],['b', 'b'] }

 */

let isOperation = (key) => {
    return key[0] == '$'
}

let recursiveApply = (data, delta) => {
    delta.forEach((key, value) => {
        if(isOperation(key)) {

            let operation = operations[key]
            operation(data,  value)

        } else {

            if(isPrimitive(value) || isArray(value)) {
                data[key] = delta
            }
            else { // object
                let target = data[key] || {}
                _recursiveApply(target, value)
            }
        }
    })
}

api.applyDelta = (data, delta) => {
    recursiveApply(data, delta)
}


define(api)
