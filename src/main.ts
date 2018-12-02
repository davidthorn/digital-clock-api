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

   
    const container_hours = document.getElementById('digital-clock-hours') 
    
    if(container_hours === null  ) {
        throw new Error('container cannot be undefined')
    }
    
    const hours = new DigitalClockCanvas(container_hours)
  
    window.clock.onTimeFormChanged((c, t) => {
        hours.draw(c.convertSecondsToTimeFormat(c.totalSeconds))
        console.log(c.convertSecondsToTimeFormat(c.totalSeconds))
    })

    window.clock.countDownFromDate(new Date(Date.now() + 7200000))


}

window.onload = () => {
    window.draw()
}

window.onresize = () => {
    window.clock.clearInterval()
    window.draw()
}

