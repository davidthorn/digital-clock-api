import { DigitalClock } from './digital-clock-api/digital-clock-api' 

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

    window.clock.onTimeFormChanged((c, t) => {
        console.log(c.convertSecondsToTimeFormat(c.totalSeconds))
    })

    window.clock.startTimer({
        seconds: 100, 
        minutes: 0,
        hours: 0
    })
}

window.onload = () => {
    
}

