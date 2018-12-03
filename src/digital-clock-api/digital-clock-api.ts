import { StopWatch, TypeFormChangeHandler,StopWatchHandle, TimeFormat } from './types'
export * from './digital-clock-api'

export class DigitalClock implements StopWatch {

    onTimeFormatChangedHanders: TypeFormChangeHandler[] = []

    /**
     * The time format representing the total number of seconds, minutes, hours
     * which have either passed if not a timer or are remaining if is a timer
     *
     * @type {TimeFormat}
     * @memberof StopWatch
     */
    time: TimeFormat = {
        seconds: 0,
        minutes: 0,
        hours: 0
    }

    /**
     * Indicating the total number of seconds either remaining or which have passed
     *
     * @type {number}
     * @memberof StopWatch
     */
    totalSeconds: number = 0

    /**
     * If isTimer is true then it will count down from the
     * total number of seconds
     *
     * If isTimer is false then it will count the number of seconds which has
     * passed since starting and display in a hours:minutes:seconds format
     * 
     * @type {boolean}
     * @memberof StopWatch
     */
    isTimer: boolean = false

    /**
     * Indicates if the stop watch | timer is runnnning
     *
     * @type {boolean}
     * @memberof StopWatch
     */
    isRunning: boolean = false

    /**
     * The handle provided by the interval manager
     * This handle will be used to stop the interval when isRunning as been set to false
     *
     * @type {StopWatch | undefined}
     * @memberof StopWatch
     */
    handle?: StopWatchHandle = undefined

    constructor(timeFormat?: TimeFormat) { 
        if(timeFormat === undefined) return
        if(timeFormat.seconds < 0 || timeFormat.hours < 0 || timeFormat.hours < 0) {
            throw new Error('TimeFormats property cannot be negative, negative properties were supplied')
        }
        this.time = timeFormat
    }

    /**
     * Should decrement the totalSeconds by 1 and then return totalSeconds
     * new value
     *
     * @returns {number}
     * @memberof StopWatch
     */
    decrementSeconds(): number {

        if(this.totalSeconds === 0) {
            throw new Error(`Totals seconds is 0, cannot decrement 0`)
        }

        return --this.totalSeconds
    }

    /**
     * Indicates if the stop watch / timer is running
     * Returns true if totalSeconds is more than 0 and false otherwise
     *
     * @returns {boolean}
     * @memberof StopWatch
     */
    running(): boolean {
        return this.totalSeconds > 0 && this.handle !== undefined
    }

    /**
     * Should set the isTimer property to true
     * and set the time property to hold the time value
     * The timer should then start
     * Once the timer has started the handle property must have a StopWatchHandle set
     * 
     * This method will throw an error if the stop watch is already running
     * 
     * @param {TimeFormat} time
     * @returns {StopWatchHandle}
     * @memberof StopWatch
     */
    startTimer(time: TimeFormat): StopWatchHandle {
        
        if(this.handle !== undefined) {
            throw new Error('A timer is already runnning because a handle has been set. The previous interval must be stop prior to calling this method again. Once the interval has been stopped this property must be set to undefined')
        }
        this.totalSeconds = this.getTotalSecondsOfTimeFormat(time)
        //this.handle = setInterval(this.stopWatchIntervalHandler, 1000, this)
        this.time = time
        this.isRunning = true
        this.handle = requestAnimationFrame(this.stopWatchIntervalHandler.bind(this))

        if(this.handle === undefined) {
            throw new Error('The handle is undefined after calling setInterval, unexpected error has occurred')
        }

        return this.handle
    }

    /**
     * Should stop the timer from running
     * Sets the isRunning to false
     * and stops the interval which is running
     * Method then returns the time format which will indicate how much time is remaining
     *
     * This method will throw an error if the stop watch is not running
     * 
     * 
     * @returns {TimeFormat}
     * @memberof StopWatch
     */
    stopTimer(): TimeFormat {

        if(!this.running()) {
            throw new Error('The time must be running to stop it')
        }
        
        this.clearInterval()
        this.isRunning = false
        
        return this.time
    }

     /**
     * Should stop the interval running if it is already running
     * This method will throw an error if the interval is not running
     * The handle property must be undefined after calling this method
     *
     * @memberof StopWatch
     */
    clearInterval(): void {
        if(this.handle === undefined) {
            throw new Error('The interval must be running for it to be stoppped')
        }

        cancelAnimationFrame(this.handle)
        //clearInterval(this.handle)
        this.handle = undefined
    }

    /**
     * Converts the total number of seconds provided into a TimeFormat
     * Indicating how many seconds, minutes and hours this time in seconds is
     *
     * @param {number} totalSeconds
     * @returns {TimeFormat}
     * @memberof StopWatch
     */
    convertSecondsToTimeFormat(totalSeconds: number ): TimeFormat {
        let seconds = Math.ceil(totalSeconds % 60) // gives the remaining seconds
        let totalMinutes = Math.ceil((totalSeconds - seconds) / 60)  // gives the total number of minutes
        let minutes = Math.ceil(totalMinutes % 60) // gives the remaining number of minutes
        let hours = Math.ceil((totalMinutes - minutes) / 60) // calculates the number of hours 
        return {
            seconds,
            minutes,
            hours
        }
    }

    /**
     * Starts the stop watch counting down from the date in the future
     * This method uses the timer once again it just calculates how many total seconds
     * that there are between the current time and the future time.
     * 
     * This method will throw an error if the stop watch is already running
     *
     * @param {Date} dateInFuture
     * @returns {StopWatch} StopWatch
     * @memberof StopWatch
     */
    countDownFromDate(dateInFuture: Date): StopWatchHandle {
        let diffInTime = dateInFuture.getTime() - Date.now()
        if(diffInTime <= 0) {
            throw new Error('The date provided requires to be in the future of the current time')
        }

        this.totalSeconds = diffInTime / 1000
        const diffTime = this.convertSecondsToTimeFormat(this.totalSeconds)
        return this.startTimer(diffTime)
    }

    /**
     * Calculates the total number of seconds in this time format
     * This method will throw and error if either of the time format values are negative
     *
     * @param {TimeFormat} timeFormat
     * @returns {number} number
     * @memberof StopWatch
     */
    getTotalSecondsOfTimeFormat(timeFormat: TimeFormat): number{
        return (((timeFormat.hours * 60) + timeFormat.minutes) * 60) + timeFormat.seconds
    }

    private frames: number = 0
    private lastFrame: number = Date.now()

    /**
     * Handler for the setInterval call which will be used as the interval for the stop watch
     *
     * @memberof StopWatch
     */
    stopWatchIntervalHandler( ): void {
        if(this.frames < 60) {
            this.frames++
            if(this.handle) {
                this.clearInterval()
            }
            
            this.lastFrame = Date.now()
            this.handle = requestAnimationFrame(this.stopWatchIntervalHandler.bind(this))
            return
        }
        this.frames = 0
        this.running() ? this.decrementSeconds() : this.clearInterval()
        this.onTimeFormatChangedHanders.forEach(handler =>  {
            handler(this, this.time)
        })
        if(this.handle) {
            this.clearInterval()
        }
        
        this.lastFrame = Date.now()
        this.handle = requestAnimationFrame(this.stopWatchIntervalHandler.bind(this))
    }

    onTimeFormChanged(handler: TypeFormChangeHandler): void {
        this.onTimeFormatChangedHanders.push(handler)
    }

}
