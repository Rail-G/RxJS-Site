import globals from 'globals';
import pluginJs from '@eslint/js';
import google from 'eslint-config-google';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      'node-modules/*',
      'dist/*',
      'src/js/__test__/*',
      'eslint.config.mjs',
    ],
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      ...google.rules,
      "valid-jsdoc": "off",
      "require-jsdoc": 'off'
    },
  },
];
