export type StopWatchHandle = number | undefined

export type TypeFormChangeHandler = (clock: StopWatch ,  timeFormat: TimeFormat) => void 

export interface StopWatch {

    onTimeFormatChangedHanders: TypeFormChangeHandler[]

    /**
     * The time format representing the total number of seconds, minutes, hours
     * which have either passed if not a timer or are remaining if is a timer
     *
     * @type {TimeFormat}
     * @memberof StopWatch
     */
    time: TimeFormat

    /**
     * Indicating the total number of seconds either remaining or which have passed
     *
     * @type {number}
     * @memberof StopWatch
     */
    totalSeconds: number

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
    isTimer: boolean 

    /**
     * Indicates if the stop watch | timer is runnnning
     *
     * @type {boolean}
     * @memberof StopWatch
     */
    isRunning: boolean

    /**
     * The handle provided by the interval manager
     * This handle will be used to stop the interval when isRunning as been set to false
     *
     * @type {StopWatch | undefined}
     * @memberof StopWatch
     */
    handle?: StopWatchHandle

    /**
     * Should decrement the totalSeconds by 1 and then return totalSeconds
     * new value
     *
     * @returns {number}
     * @memberof StopWatch
     */
    decrementSeconds(): number

    /**
     * Indicates if the stop watch / timer is running
     * Returns true if totalSeconds is more than 0 and false otherwise
     *
     * @returns {boolean}
     * @memberof StopWatch
     */
    running(): boolean

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
    startTimer(time: TimeFormat): StopWatchHandle

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
    stopTimer(): TimeFormat

    /**
     * Should stop the interval running if it is already running
     * This method will throw an error if the interval is not running
     * The handle property must be undefined after calling this method
     *
     * @memberof StopWatch
     */
    clearInterval(): void

    /**
     * Converts the total number of seconds provided into a TimeFormat
     * Indicating how many seconds, minutes and hours this time in seconds is
     *
     * @param {number} totalSeconds
     * @returns {TimeFormat}
     * @memberof StopWatch
     */
    convertSecondsToTimeFormat(totalSeconds: number ): TimeFormat

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
    countDownFromDate(dateInFuture: Date): StopWatchHandle

    /**
     * Calculates the total number of seconds in this time format
     * This method will throw and error if either of the time format values are negative
     *
     * @param {TimeFormat} timeFormat
     * @returns {number} number
     * @memberof StopWatch
     */
    getTotalSecondsOfTimeFormat(timeFormat: TimeFormat): number

    /**
     * Handler for the setInterval call which will be used as the interval for the stop watch
     *
     * @param {StopWatch} stopWatch
     * @memberof StopWatch
     */
    stopWatchIntervalHandler(stopWatch: StopWatch ): void

    onTimeFormChanged(handler: TypeFormChangeHandler): void
}

type TimeFormat = {

    /**
     * Seconds between 0 and 60 for this time
     *
     * @type {number}
     */
    seconds: number

    /**
     * Minutes between 0 and 6 for this time
     *
     * @type {number}
     */
    minutes: number

    /**
     * Number of total hours from 0 to infinity
     *
     * @type {number}
     */
    hours: number
}
