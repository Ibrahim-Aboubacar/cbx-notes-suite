/**
 * Wait for a specified amount of milliseconds
 *
 * @param ms Number of milliseconds to wait
 * @returns Promise<void> that resolves after the specified amount of milliseconds
 * @example
 * ```typescript
 * await sleep(1000);
 * ```
 */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
