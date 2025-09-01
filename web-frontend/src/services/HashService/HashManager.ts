import WebCryptoHasher from "./WebCryptoHasher";
import type { THashService } from "./index";

export class HashManager {
    private drivers: Map<string, THashService["IHasher"]> = new Map();
    private defaultDriver: string;

    constructor(defaultDriver: string = "sha256") {
        this.defaultDriver = defaultDriver;
        this.drivers.set("sha256", new WebCryptoHasher("SHA-256"));
        this.drivers.set("sha384", new WebCryptoHasher("SHA-384"));
        this.drivers.set("sha512", new WebCryptoHasher("SHA-512"));
    }

    driver(name?: string): THashService["IHasher"] {
        return this.drivers.get(name || this.defaultDriver)!;
    }

    extend(name: string, hasher: THashService["IHasher"]) {
        this.drivers.set(name, hasher);
    }

    async make(value: string, options?: THashService["HashOptions"]): Promise<string> {
        return this.driver().make(value, options);
    }

    async check(value: string, hashed: string, options?: THashService["HashOptions"]): Promise<boolean> {
        return this.driver().check(value, hashed, options);
    }
}
