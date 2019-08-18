//
module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "script",
        ecmaFeatures: {
            spread: true,
        }
    },
    env: {
        es6: true,
        browser: false,
        node: true
    },

    rules: {
        "no-await-in-loop": "error",
        complexity: "warn",
        "default-case": "warn",
        "no-return-assign": "error",
        "no-useless-call": "warn",
        "no-useless-concat": "warn",
        "no-useless-return": "error",
        radix: "error",
        "require-await": "warn",
        "no-labels": "error",
        "no-use-before-define": "warn",
        "global-require": "warn",
        "handle-callback-err": "error",
        "no-mixed-requires": "error",
        "no-new-require": "error",
        "eol-last": "error",
        "array-element-newline": ["warn", { multiline: true, minItems: 5 }],
        indent: ["warn", 2],
        "comma-dangle": "off",
        "comma-spacing": ["warn", { before: false, after: true }],
        "max-depth": ["error", 5],
        "max-len": [
            "error",
            {
                code: 120,
                tabWidth: 2,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        "max-lines": [
            "error", { max: 500, skipBlankLines: true, skipComments: true }
        ],
        "max-lines-per-function": ["error", { max: 80, skipBlankLines: false, skipComments: true, IIFEs: false }],
        "max-nested-callbacks": "error",
        "max-params": ["error", { max: 6 }],
        "max-statements": "off",
        "max-statements-per-line": ["error", { max: 1 }],
        "multiline-ternary": ["error", "always-multiline"],
        "new-cap": "error",
        "new-parens": "error",
        "newline-per-chained-call": "warn",
        "no-multi-assign": "error",
        "no-nested-ternary": "error",
        "no-tabs": "error",
        "no-trailing-spaces": "error",
        "one-var-declaration-per-line": "error",
        "padded-blocks": ["warn", { classes: "always" }, { allowSingleLineBlocks: true }],
        "prefer-object-spread": "error",
        quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
        semi: "error",
        "space-before-blocks": ["warn", { functions: "always", keywords: "always", classes: "always" }],
        "space-infix-ops": "error",
        "space-unary-ops": ["error", { words: true, nonwords: false }],
        "spaced-comment": ["error", "always", {
            line: { markers: [], exceptions: [] },
            block: { markers: [], exceptions: [], balanced: true }
        }],
        "template-tag-spacing": ["error", "always"],
        "arrow-body-style": ["error", "as-needed", { requireReturnForObjectLiteral: true }],
        "arrow-parens": ["warn", "as-needed", { requireForBlockBody: false }],
        "arrow-spacing": ["error", { before: true, after: true }],
        "generator-star-spacing": ["error", { before: true, after: false }],
        "no-confusing-arrow": ["error", { allowParens: false }],

        "no-var": "error",
        "no-useless-rename": "error",
        "no-useless-computed-key": "warn",
        "no-useless-escape": "error",
        "prefer-const": "error",
        "prefer-arrow-callback": ["warn", { allowNamedFunctions: true, allowUnboundThis: true }],
        "prefer-destructuring": [
            "error", {
                VariableDeclarator: { array: true, object: true },
                AssignmentExpression: { array: true, object: true }
            },
            { enforceForRenamedProperties: false }
        ],
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "warn",
        "rest-spread-spacing": ["error", "never"],
        "symbol-description": "error",
        "template-curly-spacing": ["error", "never"],
        "no-template-curly-in-string": "error",
        "yield-star-spacing": ["error", "after"],


        "key-spacing": ["warn"]

    }
};