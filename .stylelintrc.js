module.exports = {
  extends: ['stylelint-config-framelunch', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  ignoreFiles: ['.tmp/**/*', 'build/**/*', '_template/**/*', 'assets/**/*', 'src/assets/**/*'],
  rules: {
    "order/properties-order": null,
    "no-descending-specificity": null,
    "selector-max-specificity": null,
    "selector-max-id": null,
    "selector-max-universal": null,
  }
};
