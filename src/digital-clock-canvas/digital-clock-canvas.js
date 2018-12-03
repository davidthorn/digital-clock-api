"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DigitalClockCanvas {
    constructor(container) {
        this.digits = [];
        this.container = container;
        //    this.container.setAttribute('style' ,`width: ${(document.body.clientWidth / 2).toString()}`)
        //    this.container.setAttribute('style' ,`height: ${(document.body.clientHeight / 6).toString()}`)
        this.frame = this.container.getBoundingClientRect();
    }
    /**
     *Should draw the canvas using the time format
     *
     * @param {TimeFormat} time
     * @memberof DigitalClockCanvas
     */
    draw(time) {
        const h = window.innerHeight;
        const w = window.innerWidth;
        const height = (h / 4.5) + 60;
        const width = (w / 1.5) + 60;
        const marginLeft = (w - width) / 2;
        const marginTop = (h - height) / 2;
        let hours = time.hours < 10 ? `0${time.hours}` : `${time.hours}`;
        let minutes = time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`;
        let seconds = time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`;
        this.container.setAttribute('style', `margin-top: ${marginTop}px; margin-left: ${marginLeft}px; height: ${height.toString()}px; width: ${width.toString()}px; font-size: ${width / 5}px;line-height:${height}px; `);
        this.container.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}
exports.DigitalClockCanvas = DigitalClockCanvas;
