import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        customElements: 'readonly',
        localStorage: 'readonly',
        structuredClone: 'readonly'
      }
    },
    rules: {
      'no-console': 'off',
      'class-methods-use-this': 'off'
    }
  }
];
