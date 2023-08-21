export const radian = (deg: number) => {
    return (deg * Math.PI) / 180
}

export const calcRealFrameRate = (fr: number) => {
    return Math.round(1000 / fr)
}
