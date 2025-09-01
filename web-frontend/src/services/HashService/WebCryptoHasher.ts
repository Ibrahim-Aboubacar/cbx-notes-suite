import type { IHasher, HashAlgo, HashOptions } from "./interfaces/IHasher";

export default class WebCryptoHasher implements IHasher {
    private algo: HashAlgo;

    constructor(algo: HashAlgo = "SHA-256") {
        this.algo = algo;
    }

    async make(value: string, options: HashOptions = {}): Promise<string> {
        const algo = options.algorithm ?? this.algo;
        const data = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest(algo, data);

        return Array.from(new Uint8Array(digest))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }

    async check(value: string, hashed: string, options: HashOptions = {}): Promise<boolean> {
        const newHash = await this.make(value, options);
        return newHash === hashed;
    }

    async needsRehash(hashed: string, options: HashOptions = {}): Promise<boolean> {
        // ex: on force rehash si algo a changé
        return (options.algorithm ?? this.algo) !== this.algo && !!hashed;
    }

    info(hashed: string) {
        return { algorithm: this.algo, length: hashed.length };
    }
}
