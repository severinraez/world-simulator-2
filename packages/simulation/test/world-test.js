'use strict'

import World from '../world'

describe('simulation/world', function () {

    beforeEach(function() {
        this.world = new World({ houses: 2, people: 5})
    })

    it('initialization', function() {
        expect(this.world.getState().houses).to.equal(2)
    })

    it('#change', function() {
        let delta = { houses: 5 }
        this.world.change(delta)

        expect(this.world.getState().houses).to.equal(5)
    })

    describe('history', function() {

        it('#getHistory', function() {
            expect(this.world.getHistory()).to.eql([])

            this.world.change({people: 0})
            expect(this.world.getHistory()).to.eql([{people: 0}])

            this.world.change({people: 10})
            expect(this.world.getHistory()).to.eql([{people: 0}, {people: 10}])
        })

        it('#clearHistory', function() {
            this.world.change({people: 0})
            expect(this.world.getHistory().length).to.equal(1)

            this.world.clearHistory()
            expect(this.world.getHistory().length).to.equal(0)
        })
    })
})


