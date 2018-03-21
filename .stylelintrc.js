const primerConfig = require('stylelint-config-primer')

module.exports = {
  extends: ['stylelint-config-standard'],
  syntax: 'scss',
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-empty-line-before': null,
    'block-opening-brace-space-after': null,
    'block-closing-brace-space-before': null,
    'declaration-colon-newline-after': null,

    'string-quotes': 'single',
    'color-hex-length': 'long',
    'color-named': 'never',
    'declaration-no-important': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': true,

    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': primerConfig.rules['order/properties-order'],
  },
}
