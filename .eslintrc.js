module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "ignorePatterns": [
        "node_modules/",
        "dist/",
        "coverage/",
        "package.json",
        "tsconfig.json",
        ".eslintrc.json",
        ".editorconfig",
        "docker-entrypoint-initdb.d/"
    ],
    "rules": {
        "import/extensions": ["error", "never"],
        "import/prefer-default-export": "off",
        "import/first": "off",
        "linebreak-style": ["error", "unix"],
        "indent": ["error", 4],
        "comma-dangle": ["error", "never"],
        "class-methods-use-this": "off",
        "semi": ["error", "always"],
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": ["**/*.test.ts", "**/*.test.js"]
        }
        ]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};
