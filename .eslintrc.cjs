const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        project: path.join(__dirname, "tsconfig.json"),
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
};

module.exports = config;
