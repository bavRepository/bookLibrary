module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended"
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script"
			}
		}
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["react"],
	rules: {
		"react/no-unescaped-entities": 0,
		"default-case": "off",
		"implicit-arrow-linebreak": "off",
		"react/no-direct-mutation-state": "off",
		"class-methods-use-this": "off",
		"react/jsx-key": [0, { checkFragmentShorthand: true }],
		"array-callback-return": "off",
		"no-debugger": "warn",
		"import/named": "off",
		"no-undef": "off",
		"no-underscore-dangle": "off",
		"prefer-promise-reject-errors": "off",
		"prefer-destructuring": "off",
		"prefer-rest-params": "off",
		"prefer-const": "off",
		"import/prefer-default-export": "off",
		"import/order": "off",
		"import/namespace": "off",
		"import/no-unresolved": "off",
		"no-param-reassign": ["off", { props: false }],
		"no-unreachable": "off",
		"no-multi-assign": "error",
		"no-fallthrough": "error",
		"operator-assignment": "off",
		"no-console": "off",
		"no-alert": "off", // we use window.prompt
		"no-constant-condition": "off",
		"max-classes-per-file": ["error", { max: 2 }],
		"no-shadow": "off", // a lot of errors
		"new-cap": "off",
		"no-lonely-if": "error",
		"no-useless-escape": "error",
		"no-return-await": 0,
		"no-nested-ternary": "off", // a ? xxx : bbb ? ccc : ddd
		"no-unused-expressions": "off",
		"no-bitwise": "off",
		"computed-property-spacing": "off",
		"guard-for-in": "error",
		"no-unused-vars": "off",
		"no-throw-literal": "off",
		"no-trailing-spaces": "off",
		"no-return-assign": "error",
		"no-useless-return": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-cycle": "off",
		"no-prototype-builtins": "error",
		"no-restricted-syntax": "off",
		"object-curly-newline": "off",
		"func-names": "off",
		"max-len": "off",
		"consistent-return": "off",
		"no-use-before-define": "off",
		radix: "error",
		"no-var": "error",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"prettier/prettier": [
			"warn",
			{
				endOfLine: "auto"
			}
		]
	}
}
