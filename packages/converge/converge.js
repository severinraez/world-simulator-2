'use strict'

import _ from 'underscore'

/*
    converge modifies objects in place using a protocol coding which changes to apply.

    @see the tests for examples on how it's used.
 */

let isOperation = (key) => {
    return key[0] == '$'
}

let types = {
    ARRAY: 0,
    OBJECT: 1,
    PRIMITIVE: 2
}

let type = (value) => {
    if(Array.isArray(value))
        return types.ARRAY

    if(typeof value == "object")
        return types.OBJECT

    if(typeof value == "function")
        throw new Error('function found')

    return types.PRIMITIVE
}

let isPrimitive = (value) => { return  }
let isArray = (value) => { return Array.isArray(value) }

let operations = {
    /* options: Array of modifications or an object

             { dims: number of dimensions, delta: array of modifications }.

         The array of modifications is split into tuples of the form

             [ index-of-first-dimension, index-of-second-dimension, ..., new-value ]

         and for every tuple, $idx will change

             data[index1][...][indexN] = new-value.
    */
    $idx: (data, options) => {
        let modifications = options
        let dimensions = 1

        if(type(options) == types.OBJECT) {
            modifications = options.delta
            dimensions = options.dim }

        if(!Number.isInteger(dimensions) || dimensions < 1) {
            throw Error.new("Cannot work with those dimensions: " + dimensions) }

        let sliceLength = dimensions + 1; // length of each index/data tuple
        let slices = modifications.length / sliceLength // number of index/data tuples

        for(let slice = 0; slice < slices; slice++) {
            let startIndex = slice * sliceLength
            let dimension = 0;

            let target = data;

            // Dig through all the dimensions specified and when reaching the highest one,
            // apply the new value given
            for(let dimension = 0; dimension < dimensions; dimension++) {

                let modificationIndex = startIndex + dimension
                let targetIndex = modifications[modificationIndex]

                if(dimension < dimensions - 1) { // Move target pointer to next dimension.
                    target = target[targetIndex] }
                else { // Last dimension; write data.
                    let newValue = modifications[modificationIndex + 1]
                    target[targetIndex] = newValue
                }
            }
        }
    },

    // options: Array of keys to remove from the array 'data'.
    $remove: (data, options) => {
        options.forEach((key) => {
            delete data[key]
        })
    }
}

let recursiveApply = (data, delta) => {
    _.each(delta, (value, key) => {
        if(isOperation(key)) {

            let operation = operations[key]
            operation(data, value)

        } else {

            let t = type(value)

            if(t == types.PRIMITIVE || t == types.ARRAY) {
                data[key] = value
            }
            else { // object
                data[key] = data[key] || {}

                recursiveApply(data[key], value)
            }
        }
    })
}

let api = {}

api.applyDelta = (data, delta) => {
    recursiveApply(data, delta)

    return data;
}

export default api
