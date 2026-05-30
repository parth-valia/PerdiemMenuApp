module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    'react-native/no-inline-styles': 'error',
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/'],
  overrides: [
    {
      // CommonJS config files can't use ES imports — allow require() in them
      files: ['*.config.js', '*.config.ts', 'jest.config.*'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
