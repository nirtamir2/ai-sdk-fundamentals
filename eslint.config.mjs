import nirtamir2 from '@nirtamir2/eslint-config'

export default nirtamir2({
    react: true,
}, {
    rules: {
        "n/prefer-global/process": "off",
        "unicorn/prefer-top-level-await": "off",
        "github/no-then": "off",
        "no-console": "off",
        "react-refresh/only-export-components": "off",
        "jsx-a11y/heading-has-content": "off",
        "react/jsx-pascal-case": "off",
        "unicorn/prefer-module": "off",
        "tsdoc/syntax": "off",
    }
})
