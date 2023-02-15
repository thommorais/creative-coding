module.exports = {
	env: {
		browser: true,
		node: true,
		jquery: true,
		jest: true,
	},
	extends: ['prettier', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
	// parser: '@babel/eslint-parser',
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2020,
		ecmaFeatures: {
			impliedStrict: true,
			classes: true,
		},
	},
	plugins: ['html', 'prettier', 'react-hooks', 'sort-imports-es6-autofix'],
	rules: {
		'no-debugger': 2,
		'no-alert': 0,
		'no-await-in-loop': 0,
		'no-return-assign': [2, 'except-parens'],
		'no-restricted-syntax': [2, 'LabeledStatement', 'WithStatement'],
		'no-unused-vars': [
			1,
			{
				ignoreRestSiblings: true,
				argsIgnorePattern: 'res|next|^err',
			},
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
			},
		],
		'arrow-body-style': [2, 'as-needed'],
		'no-unused-expressions': [
			2,
			{
				allowTaggedTemplates: true,
			},
		],
		'no-param-reassign': [
			2,
			{
				props: false,
			},
		],
		'no-console': [0],
		'import/prefer-default-export': 0,
		'func-names': 0,
		'space-before-function-paren': 0,
		'max-len': 0,
		'sort-imports-es6-autofix/sort-imports-es6': [
			2,
			{
				ignoreCase: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
		'import/extensions': 0,
		'react/display-name': 2,
		'no-debugger': 2,
		'react/react-in-jsx-scope': 0,
		'jsx-a11y/accessible-emoji': 0,
		'react/require-default-props': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		radix: 0,
		'no-shadow': [
			2,
			{
				hoist: 'all',
				allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
			},
		],
		quotes: [
			2,
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		'jsx-a11y/href-no-hash': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		// We are disabling these rules for now to prevent errors. This will be activated for staged changes only.
		'react/prop-types': 0,
		'comma-dangle': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'react/jsx-max-props-per-line': [
			1,
			{
				maximum: 5,
			},
		],
		'no-magic-numbers': [
			'warn',
			{
				ignore: [0, 1, -1, 60, 100, 1000],
				ignoreArrayIndexes: true,
				enforceConst: false,
				detectObjects: false,
			},
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
