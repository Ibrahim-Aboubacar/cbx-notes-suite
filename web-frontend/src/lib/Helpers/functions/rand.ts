/**
 * Generate a random number between min and max
 *
 * @param min Minimum number
 * @param max Maximum number
 * @returns Number: Random number between min and max
 */
export function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}