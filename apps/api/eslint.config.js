// @ts-check
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import globals from 'globals'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import { configs as tseslintConfigs, parser } from 'typescript-eslint'
import nodePlugin from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import-x'
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import pluginSecurity from 'eslint-plugin-security'
import noSecrets from 'eslint-plugin-no-secrets'
import { configs as sonarjs } from 'eslint-plugin-sonarjs'
import stylistic from '@stylistic/eslint-plugin'

const extensions = ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}']

export default defineConfig(
  globalIgnores([
    '**/schemas.d.ts',
    '**/.node_modules',
    '**/dist',
    '**/cache',
    '**/build',
    '**/node_modules/**/*',
    '**/generated/**/prisma',
    '**/generated/**/zod',
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        ...globals.es2024,
        ...globals.builtin,
      },
      parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
        },
      },
    },
  },
  {
    files: extensions,
    plugins: {
      'no-secrets': noSecrets,
      'unicorn': eslintPluginUnicorn,
    },
    extends: [
      js.configs.recommended,
      tseslintConfigs.recommended,
      tseslintConfigs.strictTypeChecked,
      nodePlugin.configs['flat/recommended-script'],
      pluginPromise.configs['flat/recommended'],
      pluginImportConfigs.recommended,
      pluginImportConfigs.typescript,
      comments.recommended,
      pluginSecurity.configs.recommended,
      sonarjs.recommended,
      stylistic.configs.recommended,
    ],
    rules: {
      'curly': ['error', 'multi-or-nest', 'consistent'],
      'quote-props': ['error', 'consistent-as-needed'],
      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-debugger': 'error',
      'no-console': 'error',
      'no-cond-assign': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-restricted-syntax': [
        'error',
        'DebuggerStatement',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'object-curly-spacing': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'generator-star-spacing': 'off',
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'eqeqeq': ['error', 'allow-null'],
      'no-case-declarations': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-void': 'error',
      'require-await': 'error',
      'no-return-assign': 'error',

      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allow: [{ name: ['Error', 'URL', 'URLSearchParams'], from: 'lib' }],
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],

      'promise/always-return': ['error', { ignoreLastCallback: true }],

      'import-x/no-dynamic-require': 'error',
      'import-x/no-nodejs-modules': 'off',

      'n/no-extraneous-import': [
        'error',
        {
          allowModules: ['@commitlint/types'],
        },
      ],
      'n/no-missing-import': [
        'error',
        {
          allowModules: ['dayjs'],
        },
      ],

      '@stylistic/brace-style': ['error', '1tbs'],

      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkShorthandImports: false,
          allowList: {
            env: true,
            args: true,
            ProcessEnv: true,
            QueryParams: true,
            getEnv: true,
            props: true,
            Params: true,
            prev: true,
            ModelArgs: true,
            AccountTypeFindManyArgsSchema: true,
          },
        },
      ],
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-array-method-this-argument': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-empty-file': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true,
          },
        },
      ],
      'unicorn/no-array-for-each': 'off',

      'no-secrets/no-secrets': [
        'error',
        {
          additionalDelimiters: ['.', '-', '(?=[A-Z][a-z])'],
        },
      ],

      'security/detect-object-injection': 'off',

      'sonarjs/no-duplicate-string': [
        'error',
        {
          ignoreStrings: [
            'content-manager',
            'content-type-builder',
            'MM-DD-YYYY',
            'DD-MM-YYYY',
            'DD MMM, YYYY',
            'YYYY-MM-DD',
            'YYYY-MM-DD HH:mm:ss',
            'application/json',
            'text/plain',
            'generic.messageDataDefault',
            'generic.notFoundInfo',
            'generic.updateInfo',
            'generic.deleteInfo',
            'generic.createSuccess',
            'generic.uploadFileSuccess',
            'error.errorTry',
            'schema.structure_column',
            'schema.require_column',
            'error.checkPrivileges',
            'error.notFoundPrivileges',
            'error.methodNotsupported',
          ].join(','),
        },
      ],
    },
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import-x/resolver': {
        typescript: {
          typescript: {
            project: './tsconfig.json',
            alwaysTryTypes: true,
          },
          node: {
            extensions: ['.ts', '.d.ts'],
          },
        },
      },
    },
  },
)
