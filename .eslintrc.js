module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'react/destructuring-assignment': 0,
    'react/react-in-jsx-scope': 0,
  },
};
