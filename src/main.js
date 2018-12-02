"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const digital_clock_api_1 = require("./digital-clock-api/digital-clock-api");
Window.prototype.project = (() => {
    return new digital_clock_api_1.DigitalClock();
})();
Window.prototype.draw = () => {
    window.project.startTimer({
        seconds: 100,
        minutes: 0,
        hours: 0
    });
};
window.onload = () => {
    window.project;
};
