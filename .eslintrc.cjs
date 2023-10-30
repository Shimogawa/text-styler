module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "max-len": ["error", { "code": 120 }],
    "quotes": ["error", "single"],
    "semi": "error",
    "no-empty": "off",
    "no-trailing-spaces": "error",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-empty-function": "off",
    // react
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": ["error", 2],
    "react/jsx-no-target-blank": "off"
  },
}
