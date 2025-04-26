// eslint.config.js
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'

{
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json', // 推荐显式绑定
    },
  },
  plugins: {
    '@typescript-eslint': typescript,
  },
  rules: {
    ...typescript.configs.recommended.rules,
    // 可选增强
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
