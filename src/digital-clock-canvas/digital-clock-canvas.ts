import { TimeFormat } from "..";

export class DigitalClockCanvas {

    container: HTMLElement

    canvas: HTMLCanvasElement

    context: CanvasRenderingContext2D

    frame: DOMRect

    digits: number[] = []

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
    draw( )  {
        const ctx = this.context
        const f = this.container.getBoundingClientRect()
        ctx.clearRect(0,0,f.width , f.height)
        ctx.fillStyle = '#111111'
        ctx.fillRect(0,0, f.width, f.height)

        const cols = f.width / 10
        const rows = f.height / 20

        for(let x = 0; x < cols; x++) {
            ctx.moveTo(x * cols, 0)
            ctx.lineWidth = 1
            ctx.strokeStyle = 'white'
            ctx.lineTo(x * cols , f.height)
            ctx.stroke()
        }

        for(let y = 0; y < rows; y++) {
            ctx.moveTo(0, y * rows)
            ctx.lineWidth = 1
            ctx.strokeStyle = 'white'
            ctx.lineTo(f.width , y * rows)
            ctx.stroke()
        }

        
        

        
    }

}