import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import parser from "@typescript-eslint/parser"; // Import the parser

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Ensures relative imports work correctly
});

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"], // Target TypeScript files
    languageOptions: {
      parser, // Pass the imported parser here
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Support JSX
        },
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];
