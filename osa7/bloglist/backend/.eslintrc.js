module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true,
        "cypress/globals": true
    },
    "extends": "airbnb",
	'globals': {
		"Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
        'linebreak-style': [
            'error',
            'windows'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
};
