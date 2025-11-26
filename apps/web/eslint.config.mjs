// @ts-check
import antfu from '@antfu/eslint-config'
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import noSecrets from 'eslint-plugin-no-secrets'
import pluginPromise from 'eslint-plugin-promise'
import pluginSecurity from 'eslint-plugin-security'
import { configs as sonarjs } from 'eslint-plugin-sonarjs'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(
    {
      unocss: true,
      formatters: true,
    },
    {
      files: ['**/*.{ts,mts,tsx,vue}'],
      plugins: [
        noSecrets,
        comments.recommended,
        pluginSecurity.configs.recommended,
        sonarjs.recommended,
      ],
    },
    pluginPromise.configs['flat/recommended'],
  ),
)
