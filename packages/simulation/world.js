'use strict'

import converge from 'packages/converge'

const World = class {
    constructor(state) {
        this.state = state
        this.history = []
    }

    change(delta) {
        converge.applyDelta(this.state, delta)

        this.history.push(delta)
    }

    getState () { return this.state }
    getHistory() { return this.history }

    clearHistory() {
        this.history = []
    }
}

export default World;
