import globals from 'globals';

import tseslint from 'typescript-eslint';
//import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';

import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // TypeScriptファイルのみを対象
    languageOptions: {
      globals: globals.browser,
      parser: tseslintParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript用のカスタムルールを追加
    },
  },
  prettierConfig,
];
