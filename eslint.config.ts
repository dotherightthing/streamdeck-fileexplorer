import { config } from "@elgato/eslint-config";
import stylistic from '@stylistic/eslint-plugin';

export default [
    // Spread the Elgato recommended config
    ...config.recommended,

    // Ignore library files and generated code
    {
        ignores: [
            "**/ui/sdpi-components.js",
            "**/bin/**",
        ],
    },

    // Add stylistic plugin and custom rules
    {
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            // Override indent rule with 4 spaces
            "indent": "off", // Turn off base indent rule
            "@stylistic/indent": ['error', 4],
            
            // Don't require JSDoc, but validate it when present
            "jsdoc/require-jsdoc": "off",
            
            // Disable member ordering requirement
            "@typescript-eslint/member-ordering": "off",
        },
    },
];
