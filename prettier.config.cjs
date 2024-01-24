/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  arrowParens: "avoid",
  bracketSameLine: true,
  bracketSpacing: false,
  printWidth: 88,
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
};

module.exports = config;
