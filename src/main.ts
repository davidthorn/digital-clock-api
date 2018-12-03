import { DigitalClock } from './digital-clock-api/digital-clock-api' 
import {DigitalClockCanvas } from './digital-clock-canvas/digital-clock-canvas'
import { TimeFormat } from './digital-clock-api/types';

declare global {
    interface  Window {
        clock: DigitalClock
        draw(): void
        defaultTime: TimeFormat
    }
}


Window.prototype.clock = ((): DigitalClock =>  {
    const d = new DigitalClock()
    return d
})()

Window.prototype.draw = () => {
    window.clock.startTimer(window.clock.convertSecondsToTimeFormat(window.clock.totalSeconds))
}

window.onload = () => {
    const container_hours = document.getElementById('digital-clock-hours') 
    
    if(container_hours === null  ) {
        throw new Error('container cannot be undefined')
    }
    
    const hours = new DigitalClockCanvas(container_hours)

    window.clock.onTimeFormChanged((c, t) => {
        hours.draw(c.convertSecondsToTimeFormat(c.totalSeconds))
        console.log(c.convertSecondsToTimeFormat(c.totalSeconds))
    })
    let savedTime = window.localStorage.getItem('time')
    let timeLeft = window.localStorage.getItem('time_left')
    
    if(savedTime === null) return
    if(timeLeft === null) return
    let timePassed = (Date.now() / 1000) - parseInt(timeLeft)
    window.clock.startTimer(window.clock.convertSecondsToTimeFormat(parseInt(savedTime) - timePassed))
    console.log('load again')
}

window.onresize = () => {
    if(window.clock.running()) {
        window.clock.stopTimer()
    }
    
    window.draw()
}

Window.prototype.defaultTime = {
    seconds: 0,
    minutes: 0,
    hours: 8.5
}

window.onunload = () => {
    window.localStorage.setItem('time' , window.clock.totalSeconds.toString())
    window.localStorage.setItem('time_left' , (Date.now() / 1000).toString())
}



window.onfocus = () => {
    let savedTime = window.localStorage.getItem('time')
    let timeLeft = window.localStorage.getItem('time_left')
    
    if(savedTime === null) return
    if(timeLeft === null) return
    let timePassed = (Date.now() / 1000) - parseInt(timeLeft)
    window.clock.totalSeconds = parseInt(savedTime) - timePassed
    window.clock.time = window.clock.convertSecondsToTimeFormat(window.clock.totalSeconds)
    if(window.clock.running()) {
        window.clock.stopTimer()
    }
    window.draw()
}