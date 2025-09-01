/**
 * Count the number of words in a string
 *
 * @param text String to count words in
 * @returns Number of words in the string
 * @example
 * ```typescript
 * wordCount("Hello world"); // 2
 * ```
 */
export const wordCount = (text: string) => {
    return text.match(/(\w+)/g)?.length || 0;
}