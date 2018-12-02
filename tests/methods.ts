import { DigitalClock } from '../src/digital-clock-api'
import { expect } from 'chai'
import { notDeepEqual } from 'assert';

describe('Digital Clock - Methods' , () => {

    const baseDate = (): Date => {
        const now = new Date()
        now.setUTCFullYear(1970)
        now.setUTCMonth(0, 1)
        now.setUTCHours(0)
        now.setUTCMinutes(0)
        now.setUTCSeconds(0)
        now.setUTCMilliseconds(0)
        return now
    }

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

    

    it('startTimer() should not throw when called' , () => {
        clock.isRunning = true
        let time = {
            seconds: 0,
            minutes: 1,
            hours: 0
        }
        clock.totalSeconds = 1
        expect(clock.startTimer.bind(clock, time) , 'startTimer must not throw').to.not.throw() 
        expect(clock.isRunning).to.equal(true)
        expect(clock.handle).to.not.undefined
        expect(clock.time).to.equal(time)

        expect(clock.stopTimer.bind(clock)).to.not.throw()

        expect(clock.isRunning).to.equal(false)
        expect(clock.handle).to.undefined
        expect(clock.time).to.equal(time)
    })

    it('stopTimer() should not throw when the time is running' , () => {
        clock.isRunning = true
        let time = {
            seconds: 0,
            minutes: 1,
            hours: 0
        }

        clock.totalSeconds = time.minutes * 60 + time.seconds
        clock.startTimer(time)
        expect(clock.time).to.be.equal(time)
        expect(clock.isRunning).to.equal(true)
        expect(clock.totalSeconds).to.greaterThan(0)
        expect(clock.running.call(clock)).to.equal(true)
        expect(clock.stopTimer.bind(clock)).to.not.throw()
        expect(clock.isRunning).to.equal(false)
        expect(clock.handle , "The handle should now be undefined because the time has stopped").to.be.undefined
        
    })

    it('convertSecondsToTimeFormat converts 180 seconds to s:0, m: 3, h:0', () => {
        let time = clock.convertSecondsToTimeFormat(180)
        expect(time.seconds).to.equal(0)
        expect(time.minutes).to.equal(3)
        expect(time.hours).to.equal(0)
    })

    it('convertSecondsToTimeFormat converts 3675 seconds to s:15, m:1, h:1', () => {
        let time = clock.convertSecondsToTimeFormat(3675)
        expect(time.seconds).to.equal(15)
        expect(time.minutes).to.equal(1)
        expect(time.hours).to.equal(1)
    })

    it('countDownFromDate() should throw an error if provided a date in the past' , () => {
        const now = baseDate()
        const future = new Date(now.getTime() + (3600 * 1000))

        const time = clock.convertSecondsToTimeFormat(future.getTime() / 1000)
        expect(clock.countDownFromDate.bind(clock, future)).to.throw()
    })

    it('countDownFromDate() should throw an error if provided Date.now' , () => {
        expect(clock.countDownFromDate.bind(clock,new Date())).to.throw()
    })

    it('countDownFromDate() initiates the stop watch using a date which is 1 hour in the future' , () =>  {
        
        const now = new Date()
        const then = now.getTime()
        const future = new Date(then + (3600 * 1000))

        expect(future.getTime(), "futures getTime() to be the same as now plus one hour").to.be.equal(then + (3600 * 1000))

        const time = clock.convertSecondsToTimeFormat((future.getTime() - then) / 1000)
        
        let handle = clock.countDownFromDate(future)
        expect(clock.totalSeconds, `The clocks total seconds should be more than 0`).to.be.greaterThan(0)
        expect(clock.handle, "The clocks handle must not be undefined").to.not.be.undefined
        expect(handle, "The clocks handle requires to be equal to the one which was returned").to.be.equal(clock.handle)
        
        expect(clock.isRunning, "the clocks isRunning property should be true").to.be.equal(true)
        expect(clock.running.call(clock) , "The result of running() should be true").to.equal(true)
        
        expect(clock.time.seconds).to.be.equal(time.seconds)
        expect(clock.time.minutes).to.be.equal(time.minutes)
        expect(clock.time.hours).to.be.equal(time.hours)
        clock.stopTimer()
    })

    it('getTotalSecondsOfTimeFormat() should calculate that 1 hour is 3600 seconds', () => {
        expect(clock.getTotalSecondsOfTimeFormat({
            seconds: 0,
            minutes: 0,
            hours: 1
        })).to.be.equal(3600)

        expect(clock.getTotalSecondsOfTimeFormat({
            seconds: 20,
            minutes: 1,
            hours: 1
        })).to.be.equal(3680)
    })

    afterEach(() => {
        if(clock.handle === undefined) return
        clearInterval(clock.handle)
    })

})