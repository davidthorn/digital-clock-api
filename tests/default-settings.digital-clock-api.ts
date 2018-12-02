import { DigitalClock } from '../src/digital-clock-api'
import * as assert from 'assert'
//import { describe , it } from '../tester.framework'
import { expect } from 'chai'

describe('Digital Clock - Default settings' , () => {

    let clock = new DigitalClock()

    it('Time Format' , () => {
        expect(clock.time.seconds).to.equal(0 , `default time formats seconds should be 0 provided: ${clock.time.seconds} `)
        expect(clock.time.minutes).to.equal(0 , `default time formats minutes should be 0 provided: ${clock.time.minutes} `)
        expect(clock.time.hours).to.equal(0 , `default time formats hours should be 0 provided: ${clock.time.hours} `)
    })

    it('Totals seconds is 0' , () => {
        expect(clock.totalSeconds).to.equal(0 , `default total seconds should be 0 provided: ${clock.totalSeconds} `)
    })

    it('isTimer is false' , () => {
        expect(clock.isTimer).to.equal(false , `isTimer should be false provided: ${clock.isTimer}`)
    })

    it('isRunning is false' , () => {
        expect(clock.isRunning).to.be.equal(false , `isRunning should be false provided: ${clock.isTimer}`)
    })

    it('Interval handle is undefined' , () => {
        expect(clock.handle , "Interval handle should be undefined be default").to.be.undefined
    })

})