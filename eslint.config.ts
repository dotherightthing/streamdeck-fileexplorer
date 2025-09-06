import { config } from "@elgato/eslint-config";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
	{
		plugins: {
			"@stylistic": stylistic
		},
		extends: [
			stylistic.configs.recommended,
			config.recommended
		],

		// Custom rules:
		rules: {
			"@stylistic/indent": ['error', 4]
		},
	},
]);
