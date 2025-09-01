//  @ts-check
import { tanstackConfig } from "@tanstack/eslint-config";

export default [
    ...tanstackConfig,
    {
        files: ["src/**/*.ts", "src/**/*.tsx"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json", // 👈 on pointe ton tsconfig
                tsconfigRootDir: import.meta.dirname, // 👈 nécessaire pour ESLint flat config
            },
        },
        rules: {
            "@typescript-eslint/no-unnecessary-condition": "error", // règle typed
        },
    },
    {
        files: ["eslint.config.js", "prettier.config.js"],
        languageOptions: {
            parserOptions: {
                project: null, // enlève le parsing TypeScript strict sur ces fichiers
            },
        },
    },
];
