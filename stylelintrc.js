export default {
    plugins: ['stylelint-scss'],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'scss/dollar-variable-pattern': '^foo',
        'scss/selector-no-redundant-nesting-selector': true,
    },
};
