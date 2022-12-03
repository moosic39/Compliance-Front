module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:@typescript-eslint/recommended',
        'standard-with-typescript',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['import', 'jsx-a11y', 'react', '@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/explicit-function-return-type': [
            'off',
            {
                'allowExpressions': true,
            },
        ],
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 0,
    },
    settings: {
        react: {
            'version': 'detect',
        },
    },
}
