import { Animator, GridAnimation } from '../animation'
import { useEffect } from 'react'
export const Calculator = ({
    width = 1000,
    height = 500,
}: {
    width?: number
    height?: number
}) => {
    const an = new Animator()
    useEffect(() => {
        an.animate([GridAnimation])
    }, [])
    return (
        <>
            <div className="container m-auto flex justify-center">
                <canvas
                    width={`${width}px`}
                    height={`${height}px`}
                    id="hi"
                    ref={(c) => an.setCtx(c!.id)}
                />
            </div>
        </>
    )
}
