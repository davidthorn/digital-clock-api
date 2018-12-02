"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const digital_clock_api_1 = require("../src/digital-clock-api");
//import { describe , it } from '../tester.framework'
const chai_1 = require("chai");
describe('Digital Clock - Default settings', () => {
    let clock = new digital_clock_api_1.DigitalClock();
    it('Time Format', () => {
        chai_1.expect(clock.time.seconds).to.equal(0, `default time formats seconds should be 0 provided: ${clock.time.seconds} `);
        chai_1.expect(clock.time.minutes).to.equal(0, `default time formats minutes should be 0 provided: ${clock.time.minutes} `);
        chai_1.expect(clock.time.hours).to.equal(0, `default time formats hours should be 0 provided: ${clock.time.hours} `);
    });
    it('Totals seconds is 0', () => {
        chai_1.expect(clock.totalSeconds).to.equal(0, `default total seconds should be 0 provided: ${clock.totalSeconds} `);
    });
    it('isTimer is false', () => {
        chai_1.expect(clock.isTimer).to.equal(false, `isTimer should be false provided: ${clock.isTimer}`);
    });
    it('isRunning is false', () => {
        chai_1.expect(clock.isRunning).to.be.equal(false, `isRunning should be false provided: ${clock.isTimer}`);
    });
    it('Interval handle is undefined', () => {
        chai_1.expect(clock.handle, "Interval handle should be undefined be default").to.be.undefined;
    });
});
