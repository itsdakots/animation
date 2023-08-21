import { Animation, calcRealFrameRate, Dimensions } from '.'

export class Animator {
    private ctx: CanvasRenderingContext2D | null
    private screen: Dimensions
    private animations: Animation[] = []
    private frameRate: number
    constructor(frameRate: number = 60) {
        this.ctx = null
        this.screen = { width: 0, height: 0 }
        this.frameRate = frameRate
    }

    setCtx(canvasId: string) {
        this.ctx = (
            document.getElementById(canvasId) as HTMLCanvasElement
        ).getContext('2d')!
        this.screen = {
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
        }
    }

    animate(
        animations: (typeof Animation)[],
        frameRate: number = this.frameRate
    ) {
        if (this.isCtxNull()) return
        animations.forEach((A) => {
            this.animations.push(new A(this.ctx!, this.screen))
        })

        setInterval(() => {
            this.clear()
            this.animations.forEach((a) => {
                a.run()
            })
        }, calcRealFrameRate(frameRate))
    }

    clear() {
        if (this.isCtxNull()) return
        this.ctx?.setTransform()
        this.ctx?.moveTo(this.screen.width / 2, this.screen.height / 2)
    }

    private isCtxNull() {
        if (!this.ctx) {
            console.error('Canvas context undefined.')
            return true
        }
        return false
    }
}
