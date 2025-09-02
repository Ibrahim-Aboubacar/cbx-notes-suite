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

/**
 * Generate a random string of a given length.
 *
 * @param length - The desired length of the string (default: 64).
 * @returns A random string composed of alphanumeric characters.
 *
 * @example
 * // Generate a random string of default length (64)
 * const id = randomString();
 *
 * @example
 * // Generate a random string of length 16
 * const shortId = randomString(16);
 */
export function randomString(length: number = 64): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsLength = chars.length;

    // Uint32Array rempli de valeurs aléatoires
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    // Map chaque valeur vers un caractère
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % charsLength];
    }

    return result;
}