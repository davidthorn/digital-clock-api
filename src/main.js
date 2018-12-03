"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const digital_clock_api_1 = require("./digital-clock-api/digital-clock-api");
const digital_clock_canvas_1 = require("./digital-clock-canvas/digital-clock-canvas");
Window.prototype.clock = (() => {
    const d = new digital_clock_api_1.DigitalClock();
    return d;
})();
Window.prototype.draw = () => {
    window.clock.startTimer(window.clock.convertSecondsToTimeFormat(window.clock.totalSeconds));
};
window.onload = () => {
    const container_hours = document.getElementById('digital-clock-hours');
    if (container_hours === null) {
        throw new Error('container cannot be undefined');
    }
    const hours = new digital_clock_canvas_1.DigitalClockCanvas(container_hours);
    window.clock.onTimeFormChanged((c, t) => {
        hours.draw(c.convertSecondsToTimeFormat(c.totalSeconds));
        console.log(c.convertSecondsToTimeFormat(c.totalSeconds));
    });
    let savedTime = window.localStorage.getItem('time');
    let timeLeft = window.localStorage.getItem('time_left');
    if (savedTime === null)
        return;
    if (timeLeft === null)
        return;
    let timePassed = (Date.now() / 1000) - parseInt(timeLeft);
    window.clock.startTimer(window.clock.convertSecondsToTimeFormat(parseInt(savedTime) - timePassed));
    console.log('load again');
};
window.onresize = () => {
    if (window.clock.running()) {
        window.clock.stopTimer();
    }
    window.draw();
};
Window.prototype.defaultTime = {
    seconds: 0,
    minutes: 0,
    hours: 8.5
};
window.onunload = () => {
    window.localStorage.setItem('time', window.clock.totalSeconds.toString());
    window.localStorage.setItem('time_left', (Date.now() / 1000).toString());
};
