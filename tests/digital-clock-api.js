"use strict";
exports.__esModule = true;
var digital_clock_api_1 = require("../src/digital-clock-api");
var assert = require("assert");
var tester_framework_1 = require("../tester.framework");
tester_framework_1.describe('Digital clock', function () {
    var clock = new digital_clock_api_1.DigitalClock();
    tester_framework_1.it('default time format', function () {
        assert.strictEqual(clock.time.seconds, 0, "default time formats seconds should be 0 provided: " + clock.time.seconds + " ");
        assert.strictEqual(clock.time.minutes, 0, "default time formats minutes should be 0 provided: " + clock.time.minutes + " ");
        assert.strictEqual(clock.time.hours, 0, "default time formats hours should be 0 provided: " + clock.time.hours + " ");
    });
});
