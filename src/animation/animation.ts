import { Dimensions, ID, Line, Point } from '.'

export class Animation {
    protected ctx: CanvasRenderingContext2D
    protected screen: Dimensions
    public id: string
    constructor(
        ctx: CanvasRenderingContext2D,
        screen: Dimensions,
        id = ID.animation
    ) {
        this.ctx = ctx
        this.screen = screen
        this.id = id
    }

    run() {}
}

export class GridAnimation extends Animation {
    protected multiplier: number
    protected xAxis: Line
    protected yAxis: Line
    constructor(
        ctx: CanvasRenderingContext2D,
        screen: Dimensions,
        id = ID.animation
    ) {
        super(ctx, screen, id)
        this.multiplier = 5

        // X Axis
        this.xAxis = new Line(
            ctx,
            screen,
            new Point(0, screen.height / 2),
            new Point(screen.width, screen.height / 2)
        )

        // Y Axis
        this.yAxis = new Line(
            ctx,
            screen,
            new Point(screen.width / 2, 0),
            new Point(screen.width / 2, screen.height)
        )
    }

    drawXAxis() {
        this.yAxis.draw()
    }

    drawYAxis() {
        this.xAxis.draw()
    }

    drawSubLines() {
        // X Lines
        for (let i = 0; i < this.screen.height; i += this.multiplier) {
            const line = new Line(
                this.ctx,
                this.screen,
                new Point(0, i),
                new Point(this.screen.width, i),
                'lightgray'
            )
            line.draw()
        }

        // Y Lines
        for (let i = 0; i < this.screen.width; i += this.multiplier) {
            const line = new Line(
                this.ctx,
                this.screen,
                new Point(i, 0),
                new Point(i, this.screen.height),
                'lightgray'
            )
            line.draw()
        }
    }

    run() {
        this.drawSubLines()
        this.drawXAxis()
        this.drawYAxis()
    }
}
