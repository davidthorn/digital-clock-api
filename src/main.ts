import { DigitalClock } from './digital-clock-api/digital-clock-api' 
import {DigitalClockCanvas } from './digital-clock-canvas/digital-clock-canvas'

declare global {
    interface  Window {
        clock: DigitalClock
        draw(): void
    }
}


Window.prototype.clock = ((): DigitalClock =>  {
    return new DigitalClock()
})()

Window.prototype.draw = () => {

    const container = document.getElementById('digital-clock') 
    
    if(container === null) {
        throw new Error('container cannot be undefined')
    }
    
    const canvas = new DigitalClockCanvas(container)

    window.clock.onTimeFormChanged((c, t) => {
        canvas.draw(t.seconds)
        console.log(c.convertSecondsToTimeFormat(c.totalSeconds))
    })

    window.clock.startTimer({
        seconds: 100, 
        minutes: 0,
        hours: 0
    })


}

window.onload = () => {
    window.draw()
}

