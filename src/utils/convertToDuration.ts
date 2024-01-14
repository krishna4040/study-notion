export const convertSecondsToDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)

    if (hours > 0) {
        return `${hours}H ${minutes}M`
    } else if (minutes > 0) {
        return `${minutes}M ${seconds}S`
    } else {
        return `${seconds}S`
    }
}
