export const Helper = {
    sleep: (await import("./functions/sleep")).sleep,
    rand: (await import("./functions/rand")).rand,
    randomString: (await import("./functions/rand")).randomString,
    wordCount: (await import("./functions/wordCount")).wordCount,
};
