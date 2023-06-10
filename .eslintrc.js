module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Possible Errors
    "no-console": "warn", // Disallow the use of console statements
    "no-debugger": "warn", // Disallow the use of debugger statements
    "no-unused-vars": "warn", // Warn about unused variables

    // Best Practices
    eqeqeq: "error", // Require strict equality (=== and !==)
    "no-alert": "warn", // Disallow the use of alert, confirm, and prompt
    "no-eval": "error", // Disallow the use of eval()
    "no-unused-expressions": "error", // Disallow unused expressions

    // Stylistic Issues
    indent: ["error", 2], // Enforce consistent indentation (2 spaces)
    "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline object and array literals

    // ES6 Specific
    "arrow-body-style": ["error", "as-needed"], // Require parentheses around arrow function arguments when needed
    "arrow-parens": ["error", "as-needed"], // Require parentheses around arrow function arguments when needed
    "prefer-arrow-callback": "error", // Use arrow functions as callbacks when possible
  },
};
