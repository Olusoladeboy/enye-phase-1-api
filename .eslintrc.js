module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    {
      "extends": "eslint:recommended"
    }
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  },
};
