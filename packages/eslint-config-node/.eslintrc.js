module.exports = {
  env: {
    browser: true,
    'cypress/globals': true,
    es2020: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react',
    'plugin:cypress/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'cypress',
    'react',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'sort-destructure-keys',
    'sort-keys-fix'
  ],
  rules: {
    camelcase: 'off',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-async-tests': 'error',
    'cypress/no-force': 'warn',
    'cypress/no-unnecessary-waiting': 'error',
    'max-len': ['error', { code: 80, tabWidth: 2 }],
    'no-explicit-any': 'off',
    'react/display-name': 'off',
    semi: ['error', 'always'],
    'simple-import-sort/sort': 'error',
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      { caseSensitive: false }
    ],
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, minKeys: 2, natural: false }
    ],
    'sort-keys-fix/sort-keys-fix': 'warn'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  }
};
