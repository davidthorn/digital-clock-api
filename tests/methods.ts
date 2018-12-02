import { DigitalClock } from '../src/digital-clock-api'
import { expect } from 'chai'

describe('Digital Clock - Methods' , () => {

    let clock: DigitalClock;

    beforeEach(() => {
        clock = new DigitalClock()
    })

    it('decrements throws an error when total seconds is 0' , () => {
        expect(clock.decrementSeconds).to.throw()
    })

    it('decrements does not throw when total seconds is more than 0' , () => {
        clock.totalSeconds = 1
        expect(clock.totalSeconds).to.not.be.undefined
        expect(clock.decrementSeconds.bind(clock)).to.not.throw()
        expect(clock.totalSeconds).to.equal(0)
    })

    it('decrements returns 1 when totalSeconds is 2 and totalSeconds is equals 1' , () => {
        clock.totalSeconds = 2
        expect(clock.totalSeconds).to.not.be.undefined
        expect(clock.decrementSeconds()).to.equal(1)
        expect(clock.totalSeconds).to.equal(1)
    })

    it('running() returns false when totalSeconds is 0' , () => {
        expect(clock.totalSeconds).to.equal(0)
        expect(clock.running()).to.equal(false)
    })

    it('running() returns true when totalSeconds is 1' , () => {
        clock.totalSeconds = 1
        expect(clock.totalSeconds).to.equal(1)
        expect(clock.running()).to.equal(true)
    })

})