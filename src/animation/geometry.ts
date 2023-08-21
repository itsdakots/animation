import { Dimensions, radian } from '.'

// Point
export class Point {
    private x: number
    private y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    set(x: number, y: number) {
        this.setX(x)
        this.setY(y)
    }

    setX(x: number = 0) {
        this.x = x
    }

    X() {
        return this.x
    }

    Y() {
        return this.y
    }

    setY(y: number = 0) {
        this.y = y
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }
}

// Scale
export class Scale {
    private h: number
    private v: number
    constructor(h = 1, v = 1) {
        this.h = h
        this.v = v
    }

    setH(h: number = 1) {
        this.h = h
    }

    H() {
        return this.h
    }

    V() {
        return this.v
    }

    setV(v: number = 1) {
        this.v = v
    }

    setScale(h: number, v: number) {
        this.h = h
        this.v = v
    }
}

export class Skew extends Scale {
    constructor(h = 0, v = 0) {
        super(h, v)
    }

    setH(h: number = 0) {
        super.setH(h)
    }

    setV(v: number = 0) {
        super.setV(v)
    }
}

// Base Geometry
export class Geom {
    protected ctx: CanvasRenderingContext2D
    protected pos: Point
    protected scale: Scale
    protected skew: Skew
    protected rot: number
    protected screen: Dimensions
    protected size: Dimensions
    protected color: string = ''
    constructor(
        ctx: CanvasRenderingContext2D,
        screen: Dimensions,
        size: Dimensions = { width: 0, height: 0 }
    ) {
        this.ctx = ctx
        this.pos = new Point()
        this.scale = new Scale()
        this.skew = new Skew()
        this.rot = 0
        this.screen = screen
        this.size = size
    }

    setColor(c: string) {
        this.color = c
    }

    setPos(p: Point) {
        this.pos = p
    }

    adjPos(p: Point) {
        const x = this.pos.X() + p.X()
        const y = this.pos.Y() + p.Y()

        this.pos.set(x, y)
    }

    setRot(deg: number) {
        this.rot = radian(deg)
    }

    setScale(s: Scale) {
        this.scale = s
    }

    setSkew(s: Skew) {
        this.skew = s
    }

    draw() {
        // Rotation
        const rotX = this.screen.width / 2 + this.size.width / 2
        const rotY = this.screen.height / 2 + this.size.height / 2
        this.ctx.translate(rotX, rotY)
        this.ctx.rotate(this.rot)
        this.ctx.translate(-rotX, -rotY)

        // Full transform
        this.ctx.transform(
            this.scale.H(),
            this.skew.H(),
            this.skew.V(),
            this.scale.V(),
            this.screen.width / 2,
            this.screen.height / 2
        )

        // Set Color
        this.ctx.fillStyle = this.color
    }
}

export class Box extends Geom {
    draw() {
        super.draw()

        this.ctx.fillRect(
            this.pos.X(),
            this.pos.Y(),
            this.size.width,
            this.size.height
        )
    }
}

export class Line extends Geom {
    protected start: Point
    protected end: Point
    constructor(
        ctx: CanvasRenderingContext2D,
        screen: Dimensions,
        start: Point,
        end: Point,
        color: string = 'black'
    ) {
        super(ctx, screen)
        this.start = start
        this.end = end
        this.color = color
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.start.X(), this.start.Y())
        this.ctx.lineTo(this.end.X(), this.end.Y())
        this.ctx.strokeStyle = this.color
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.moveTo(this.screen.width / 2, this.screen.height / 2)
    }
}
