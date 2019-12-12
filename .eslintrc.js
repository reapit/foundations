module.exports = {

// include rules and rules are enabled by default
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],

  // !?
  "plugins": ["react", "@typescript-eslint", "prettier"],
  
  // variables that predefined
  "env": {
    "browser": true,
    "jest": true,
    "es6": true,
    "node": true
  },

  // manually control whether turn plugin on or off
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "comma-style": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/prop-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-empty-function": "off"
  },
  "settings": {
    // eslint rule react require this settings
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },

  // parser for typescript
  "parser": "@typescript-eslint/parser",
};