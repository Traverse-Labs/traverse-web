module.exports = {
  extends: [
    "next",
    "prettier",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["simple-import-sort", "prettier", "import"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error"],
    "prefer-const": "error",
    "no-irregular-whitespace": "error",
    "no-trailing-spaces": "error",
    semi: "error",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "newline-after-var": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],
    "import/no-extraneous-dependencies": ["off"],
  },
};
