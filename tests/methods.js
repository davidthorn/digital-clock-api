"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const digital_clock_api_1 = require("../src/digital-clock-api");
const chai_1 = require("chai");
describe('Digital Clock - Methods', () => {
    const baseDate = () => {
        const now = new Date();
        now.setUTCFullYear(1970);
        now.setUTCMonth(0, 1);
        now.setUTCHours(0);
        now.setUTCMinutes(0);
        now.setUTCSeconds(0);
        now.setUTCMilliseconds(0);
        return now;
    };
    let clock;
    beforeEach(() => {
        clock = new digital_clock_api_1.DigitalClock();
    });
    it('decrements throws an error when total seconds is 0', () => {
        chai_1.expect(clock.decrementSeconds).to.throw();
    });
    it('decrements does not throw when total seconds is more than 0', () => {
        clock.totalSeconds = 1;
        chai_1.expect(clock.totalSeconds).to.not.be.undefined;
        chai_1.expect(clock.decrementSeconds.bind(clock)).to.not.throw();
        chai_1.expect(clock.totalSeconds).to.equal(0);
    });
    it('decrements returns 1 when totalSeconds is 2 and totalSeconds is equals 1', () => {
        clock.totalSeconds = 2;
        chai_1.expect(clock.totalSeconds).to.not.be.undefined;
        chai_1.expect(clock.decrementSeconds()).to.equal(1);
        chai_1.expect(clock.totalSeconds).to.equal(1);
    });
    it('running() returns false when totalSeconds is 0', () => {
        chai_1.expect(clock.totalSeconds).to.equal(0);
        chai_1.expect(clock.running()).to.equal(false);
    });
    it('running() returns true when totalSeconds is 1', () => {
        clock.totalSeconds = 1;
        chai_1.expect(clock.totalSeconds).to.equal(1);
        chai_1.expect(clock.running()).to.equal(true);
    });
    it('startTimer() should not throw when called', () => {
        clock.isRunning = true;
        let time = {
            seconds: 0,
            minutes: 1,
            hours: 0
        };
        clock.totalSeconds = 1;
        chai_1.expect(clock.startTimer.bind(clock, time), 'startTimer must not throw').to.not.throw();
        chai_1.expect(clock.isRunning).to.equal(true);
        chai_1.expect(clock.handle).to.not.undefined;
        chai_1.expect(clock.time).to.equal(time);
        chai_1.expect(clock.stopTimer.bind(clock)).to.not.throw();
        chai_1.expect(clock.isRunning).to.equal(false);
        chai_1.expect(clock.handle).to.undefined;
        chai_1.expect(clock.time).to.equal(time);
    });
    it('stopTimer() should not throw when the time is running', () => {
        clock.isRunning = true;
        let time = {
            seconds: 0,
            minutes: 1,
            hours: 0
        };
        clock.totalSeconds = time.minutes * 60 + time.seconds;
        clock.startTimer(time);
        chai_1.expect(clock.time).to.be.equal(time);
        chai_1.expect(clock.isRunning).to.equal(true);
        chai_1.expect(clock.totalSeconds).to.greaterThan(0);
        chai_1.expect(clock.running.call(clock)).to.equal(true);
        chai_1.expect(clock.stopTimer.bind(clock)).to.not.throw();
        chai_1.expect(clock.isRunning).to.equal(false);
        chai_1.expect(clock.handle, "The handle should now be undefined because the time has stopped").to.be.undefined;
    });
    it('convertSecondsToTimeFormat converts 180 seconds to s:0, m: 3, h:0', () => {
        let time = clock.convertSecondsToTimeFormat(180);
        chai_1.expect(time.seconds).to.equal(0);
        chai_1.expect(time.minutes).to.equal(3);
        chai_1.expect(time.hours).to.equal(0);
    });
    it('convertSecondsToTimeFormat converts 3675 seconds to s:15, m:1, h:1', () => {
        let time = clock.convertSecondsToTimeFormat(3675);
        chai_1.expect(time.seconds).to.equal(15);
        chai_1.expect(time.minutes).to.equal(1);
        chai_1.expect(time.hours).to.equal(1);
    });
    it('countDownFromDate() should throw an error if provided a date in the past', () => {
        const now = baseDate();
        const future = new Date(now.getTime() + (3600 * 1000));
        const time = clock.convertSecondsToTimeFormat(future.getTime() / 1000);
        chai_1.expect(clock.countDownFromDate.bind(clock, future)).to.throw();
    });
    it('countDownFromDate() should throw an error if provided Date.now', () => {
        chai_1.expect(clock.countDownFromDate.bind(clock, new Date())).to.throw();
    });
    it('countDownFromDate() initiates the stop watch using a date which is 1 hour in the future', () => {
        const now = new Date();
        const then = now.getTime();
        const future = new Date(then + (3600 * 1000));
        chai_1.expect(future.getTime(), "futures getTime() to be the same as now plus one hour").to.be.equal(then + (3600 * 1000));
        const time = clock.convertSecondsToTimeFormat((future.getTime() - then) / 1000);
        let handle = clock.countDownFromDate(future);
        chai_1.expect(clock.totalSeconds, `The clocks total seconds should be more than 0`).to.be.greaterThan(0);
        chai_1.expect(clock.handle, "The clocks handle must not be undefined").to.not.be.undefined;
        chai_1.expect(handle, "The clocks handle requires to be equal to the one which was returned").to.be.equal(clock.handle);
        chai_1.expect(clock.isRunning, "the clocks isRunning property should be true").to.be.equal(true);
        chai_1.expect(clock.running.call(clock), "The result of running() should be true").to.equal(true);
        chai_1.expect(clock.time.seconds).to.be.equal(time.seconds);
        chai_1.expect(clock.time.minutes).to.be.equal(time.minutes);
        chai_1.expect(clock.time.hours).to.be.equal(time.hours);
        clock.stopTimer();
    });
    it('getTotalSecondsOfTimeFormat() should calculate that 1 hour is 3600 seconds', () => {
        chai_1.expect(clock.getTotalSecondsOfTimeFormat({
            seconds: 0,
            minutes: 0,
            hours: 1
        })).to.be.equal(3600);
        chai_1.expect(clock.getTotalSecondsOfTimeFormat({
            seconds: 20,
            minutes: 1,
            hours: 1
        })).to.be.equal(3680);
    });
    afterEach(() => {
        if (clock.handle === undefined)
            return;
        clearInterval(clock.handle);
    });
});
