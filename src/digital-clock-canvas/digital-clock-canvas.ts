import { TimeFormat } from "..";

export class DigitalClockCanvas {

    container: HTMLElement

    canvas: HTMLCanvasElement

    context: CanvasRenderingContext2D

    frame: DOMRect

    constructor(container: HTMLElement) {
        this.container = container
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.container.appendChild(this.canvas)
        this.frame = this.container.getBoundingClientRect() as DOMRect
        this.canvas.width = this.frame.width
        this.canvas.height = this.frame.height
    }

    /**
     *Should draw the canvas using the time format
     *
     * @param {TimeFormat} time
     * @memberof DigitalClockCanvas
     */
    draw(digit: number )  {

        const x = this.context
        const f = this.frame
        x.clearRect(0,0,f.width , f.height)

        x.fillStyle = '#111111'
        x.fillRect(0,0, f.width, f.height)
    }

}