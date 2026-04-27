/** @type {import('stylelint').Config} */
export default {
  extends: [],
  rules: {
    'color-no-invalid-hex': true,
    'no-duplicate-selectors': true,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'value-keyword-case': null
  },
  ignoreFiles: ['assets/css/**/*.old']
};