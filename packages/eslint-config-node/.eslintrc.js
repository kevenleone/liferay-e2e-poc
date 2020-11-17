module.exports = {
  env: {
    browser: true,
    commonjs: true,
    'cypress/globals': true,
    es6: true,
  },
  extends: [
    'standard',
    'prettier/standard',
    'plugin:cypress/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018
  },
  plugins: [
    'cypress',
    'simple-import-sort',
    'prettier',
    'sort-destructure-keys',
    'sort-keys-fix'
  ],
  rules: {
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-async-tests': 'error',
    'cypress/no-force': 'warn',
    'cypress/no-unnecessary-waiting': 'error',
    'max-len': ['error', { code: 80 }],
    'simple-import-sort/sort': 'error',
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false, minKeys: 2 }]  }
}
