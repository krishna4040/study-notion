export function convertToSeconds(timeString: string): number {
    // Extract hours, minutes, and seconds using regular expressions
    const hoursMatch = timeString.match(/\d+H/);
    const minutesMatch = timeString.match(/\d+M/);
    const secondsMatch = timeString.match(/\d+S/);

    const hours: number = hoursMatch ? parseInt(hoursMatch[0], 10) : 0;
    const minutes: number = minutesMatch ? parseInt(minutesMatch[0], 10) : 0;
    const seconds: number = secondsMatch ? parseInt(secondsMatch[0], 10) : 0;

    // Calculate total seconds
    const totalSeconds: number = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
}