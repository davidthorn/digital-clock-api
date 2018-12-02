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
    const container_minutes = document.getElementById('digital-clock-minutes') 
    const container_seconds = document.getElementById('digital-clock-seconds') 
    
    if(container_hours === null || container_minutes === null || container_seconds === null ) {
        throw new Error('container cannot be undefined')
    }
    
    const hours = new DigitalClockCanvas(container_hours)
    const minutes = new DigitalClockCanvas(container_minutes)
    const seconds = new DigitalClockCanvas(container_seconds)

    window.clock.onTimeFormChanged((c, t) => {
        hours.draw()
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

