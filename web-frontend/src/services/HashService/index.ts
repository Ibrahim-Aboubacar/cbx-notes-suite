import { HashManager } from "./HashManager";
import type { IHasher, HashAlgo, HashOptions } from "./interfaces/IHasher";

export type THashService = {
    IHasher: IHasher;
    HashAlgo: HashAlgo;
    HashOptions: HashOptions;
};

export default class Hash {
    private static instance: HashManager;

    static getInstance() {
        if (!this.instance) {
            this.instance = new HashManager();
        }
        return this.instance;
    }

    static make(value: string, options?: HashOptions): ReturnType<HashManager["make"]> {
        return Hash.getInstance().make(value, options);
    }

    static check(value: string, hashed: string, options?: HashOptions): ReturnType<HashManager["check"]> {
        return Hash.getInstance().check(value, hashed, options);
    }
}
