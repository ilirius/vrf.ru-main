import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_|React' }
      ],
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      'react-hooks/rules-of-hooks': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/comma-spacing': [
        'error',
        { before: false, after: true }
      ],
      'no-restricted-imports': ['error', {
        'patterns': ["..*"]
      }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      indent: ['error', 2],
      'react/jsx-indent': ['error', 2],
      'sort-imports': 'off',
    }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ["error", {
        groups: [// React, next and another packages
          ['^react(?!-)\\b', '^next\\b', '^[^@]\\w', '^@\\w'],
          // Internal components packages.
          ['^(@/components)(/.*|$)'],
          // Internal constants packages.
          ['^(@/constants)(/.*|$)'],
          // Internal core packages.
          ['^(@/core)(/.*|$)'],
          // Internal lib packages.
          ['^(@/lib)(/.*|$)'],
          // Internal state manager packages.
          ['^(@/store)(/.*|$)'],
          // Internal hooks packages.
          ['^(@/hooks)(/.*|$)'],
          // Internal utils packages.
          ['^(@/utils)(/.*|$)'],
          // Internal ui packages.
          ['^(@/ui)(/.*|$)'],
          // Internal context packages.
          ['^(@/context)(/.*|$)'],
          // Side effect imports.
          ['^(@/utils)(/.*|$)'],
          // Style imports.
          ['^.+\\.?(css)$'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put .. last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and . last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Internal public and assets packages.
          ['^(@public)(/.*|$)', '^(@assets)(/.*|$)']]
      }],
      'simple-import-sort/exports': "error",
    },
  },
  eslintPluginPrettier
]

export default configs
