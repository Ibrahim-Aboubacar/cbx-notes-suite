export type HashAlgo = "SHA-256" | "SHA-384" | "SHA-512";
export type HashOptions = { algorithm?: HashAlgo };

export interface IHasher {
    make(value: string, options?: HashOptions): Promise<string>;
    check(value: string, hashed: string, options?: HashOptions): Promise<boolean>;
    needsRehash?(hashed: string, options?: HashOptions): Promise<boolean>;
    info?(hashed: string): any;
}
