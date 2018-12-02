import { DigitalClock } from '../src/digital-clock-api'
import * as assert from 'assert'
//import { describe , it } from '../tester.framework'
import { expect } from 'chai'

describe('Digital clock' , () => {

    let clock = new DigitalClock()

    it('default time format' , () => {
        expect(clock.time.seconds).to.equal(1 , `default time formats seconds should be 0 provided: ${clock.time.seconds} `)
        expect(clock.time.minutes).to.equal(0 , `default time formats minutes should be 0 provided: ${clock.time.minutes} `)
        expect(clock.time.hours).to.equal(0 , `default time formats hours should be 0 provided: ${clock.time.hours} `)

    })

})