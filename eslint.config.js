/** @file Config for eslint. */
import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import pluginVitest from "@vitest/eslint-plugin"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"
import importPlugin from "eslint-plugin-import"
import jsdoc from "eslint-plugin-jsdoc"
import eslintPluginPrettier from "eslint-plugin-prettier"
import vue from "eslint-plugin-vue"
import globals from "globals"

const config = [
  // Global ignores
  {
    name: "app/global-ignores",
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/dist-ssr/**",
      "**/coverage/**",
      "**/migrations/**",
    ],
  },

  // Plugin recommended configs (do not need spreading)
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  pluginVitest.configs.recommended,
  importPlugin.flatConfigs.recommended,
  skipFormatting,

  // Plugin recommended configs (arrays that need spreading)
  ...vue.configs["flat/recommended"],

  // Base config
  {
    name: "app/base-config",
    files: ["**/*.{js,mjs,jsx,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      jsdoc,
      prettier: eslintPluginPrettier,
      vitest: pluginVitest,
      vue,
      "@stylistic": stylistic,
    },
    rules: {
      "eol-last": ["warn", "always"],
      "@stylistic/max-len": [
        "warn",
        {
          code: 120,
          comments: 100,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "comma-dangle": ["error", "only-multiline"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "prettier/prettier": "warn", // Run Prettier as an ESLint rule
      "array-callback-return": "error",
      "arrow-body-style": [
        "warn",
        "as-needed",
        { requireReturnForObjectLiteral: false },
      ],
      camelcase: ["warn", { ignoreImports: true }],
      "capitalized-comments": [
        "warn",
        "always",
        {
          ignoreConsecutiveComments: true,
          ignoreInlineComments: true,
        },
      ],
      "@stylistic/semi": ["error", "never"],
      complexity: ["warn", { max: 10 }],
      curly: ["error", "multi-line", "consistent"],
      "default-case-last": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      eqeqeq: ["error", "smart"],
      "func-names": ["error", "as-needed"],
      "func-style": [
        "error",
        "declaration",
        {
          allowArrowFunctions: true,
          overrides: { namedExports: "expression" },
        },
      ],
      "grouped-accessor-pairs": "error",
      "guard-for-in": "error",
      "init-declarations": ["error", "always"],
      "max-depth": "error",
      "max-nested-callbacks": ["error", 5],
      "max-lines": [
        "warn",
        {
          max: 250,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-params": ["error", 5],
      "max-statements": ["warn", 20],
      "max-lines-per-function": ["warn", { max: 40, skipBlankLines: true }],
      "new-cap": "error",
      "no-await-in-loop": "error",
      "no-duplicate-imports": "error",
      "no-empty-function": "warn",
      "no-else-return": "error",
      "no-extra-label": "error",
      "no-inner-declarations": "error",
      "no-implicit-coercion": "error",
      "no-invalid-this": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-lonely-if": "error",
      "no-loop-func": "error",
      "no-magic-numbers": [
        "warn",
        {
          ignoreArrayIndexes: true,
          ignore: [-1, 0, 1, 2, 100],
          enforceConst: true,
        },
      ],
      "no-multi-assign": "error",
      "no-multi-str": "error",
      "no-negated-condition": "warn",
      "no-nested-ternary": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-object-constructor": "error",
      "no-param-reassign": "error",
      "no-return-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-shadow": "warn",
      "no-template-curly-in-string": "error",
      "no-undef-init": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": "error",
      "no-unreachable-loop": "error",
      "no-unused-expressions": "warn",
      "no-unused-vars": "warn",
      "no-use-before-define": [
        "warn",
        {
          allowNamedExports: true,
          classes: true,
          functions: false,
          variables: true,
        },
      ],
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-useless-concat": "error",
      "no-var": "error",
      "no-void": "error",
      "operator-assignment": ["error", "always"],
      "object-shorthand": [
        "error",
        "always",
        {
          avoidQuotes: true,
          avoidExplicitReturnArrows: true,
        },
      ],
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-destructuring": [
        "error",
        {
          object: true,
        },
      ],
      "prefer-numeric-literals": "error",
      "prefer-object-spread": "error",
      "prefer-rest-params": "error",
      "prefer-template": "error",
      "prefer-spread": "error",
      "require-atomic-updates": "warn",
      "sort-vars": "error",
      "valid-typeof": "error",
      "vars-on-top": "error",
      "require-await": "error",
      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      "import/extensions": [
        "warn",
        "ignorePackages",
        {
          js: "always",
          vue: "always",
        },
      ],
      "import/first": "warn",
      "import/no-mutable-exports": "warn",
      "import/no-useless-path-segments": "warn",
      "import/enforce-node-protocol-usage": ["warn", "always"],
      "import/no-absolute-path": "warn",
      "import/no-cycle": "warn",
      "import/newline-after-import": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          named: {
            enabled: true,
          },
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "jsdoc/check-indentation": "warn",
      "jsdoc/check-line-alignment": "warn",
      "jsdoc/check-param-names": ["error", { enableFixer: true }],
      "jsdoc/check-syntax": "error",
      "jsdoc/check-types": "error",
      "jsdoc/check-values": "warn",
      "jsdoc/informative-docs": "warn",
      "jsdoc/lines-before-block": [
        "error" | "warn",
        {
          lines: 2,
          ignoreSameLine: false,
          checkBlockStarts: false,
          ignoreSingleLines: true,
        },
      ],
      "jsdoc/no-undefined-types": "error",
      "jsdoc/require-description-complete-sentence": "warn",
      "jsdoc/require-description": "warn",
      "jsdoc/require-file-overview": ["warn"],
      "jsdoc/require-hyphen-before-param-description": "warn",
      "jsdoc/require-asterisk-prefix": "warn",
      "jsdoc/require-throws": "warn",
      "jsdoc/sort-tags": [
        "warn",
        {
          tagSequence: [
            { tags: ["since", "access"] },
            { tags: ["class", "augments", "mixes"] },
            { tags: ["alias", "memberof"] },
            { tags: ["see", "link", "global"] },
            { tags: ["fires", "listens"] },
            { tags: ["param"] },
            { tags: ["yields"] },
            { tags: ["returns"] },
          ],
          linesBetween: 0,
        },
      ],
      "jsdoc/require-jsdoc": [
        "warn",
        {
          publicOnly: false,
          require: {
            FunctionDeclaration: true,
            FunctionExpression: true,
            ArrowFunctionExpression: false,
            MethodDefinition: true,
            ClassDeclaration: true,
            ClassExpression: true,
          },
          contexts: [
            // Top-level function declarations
            "FunctionDeclaration",

            // Arrow and function expressions assigned to variables
            "VariableDeclarator > ArrowFunctionExpression",
            "VariableDeclarator > FunctionExpression",

            // Exported functions and variables assigned to functions
            "ExportNamedDeclaration > FunctionDeclaration",
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression",
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression",
            "ExportDefaultDeclaration > FunctionDeclaration",
            "ExportDefaultDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression",
            "ExportDefaultDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression",

            // Class stuff
            "MethodDefinition",
            "ClassDeclaration",
            "ClassExpression",
          ],
        },
      ],
    },
  },

  // Backend config
  {
    name: "app/backend-overrides",
    files: ["backend/**/*.{js,ts}"],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["#config", "./backend/src/config"],
            ["#controllers", "./backend/src/controllers"],
            ["#errors", "./backend/src/errors"],
            ["#middlewares", "./backend/src/middlewares"],
            ["#models", "./backend/src/models"],
            ["#modules", "./backend/src/modules"],
            ["#registries", "./backend/src/registries"],
            ["#repositories", "./backend/src/repositories"],
            ["#routes", "./backend/src/routes"],
            ["#schemas", "./backend/src/schemas"],
            ["#services", "./backend/src/services"],
            ["#shared", "./shared/src"],
            ["#src", "./backend/src"],
            ["#utils", "./backend/src/utils"],
          ],
          extensions: [".js", ".ts", ".vue", ".jsx", ".tsx"],
        },
        node: {
          extensions: [".js", ".ts", ".mjs"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
  },

  // Shared workspace overrides
  {
    name: "app/shared-workspace",
    files: ["shared/**"],
    settings: {
      "import/resolver": {
        alias: {
          map: [["#text", "./shared/src/text"]],
          extensions: [".js", ".ts"],
        },
      },
    },
  },

  // Frontend config
  {
    name: "app/frontend-overrides",
    files: ["frontend/**/*.{js,vue,ts}"],
    rules: {
      "vue/no-v-html": "error", // Big NO : sensible to XSS
      "vue/html-indent": 0,
      "vue/singleline-html-element-content-newline": 0,
      "vue/define-macros-order": [
        "warn",
        {
          order: ["defineOptions", "defineEmits", "defineModel", "defineProps"],
          defineExposeLast: true,
        },
      ],
      "vue/v-on-event-hyphenation": ["warn", "never", { autofix: true }],
      "vue/next-tick-style": ["warn", "promise"],
      "vue/match-component-file-name": [
        "error",
        { extensions: ["vue"], shouldMatchCase: true },
      ],
      "vue/match-component-import-name": ["error"],
      "vue/no-useless-mustaches": ["warn"],
      "vue/no-undef-properties": ["error"],
      "vue/no-unused-emit-declarations": ["warn"],
      "vue/no-v-text": ["error"],
      "vue/no-unused-properties": ["warn"],
      "vue/no-useless-v-bind": ["warn"],
      "vue/padding-line-between-blocks": ["warn"],
      "vue/prefer-prop-type-boolean-first": ["warn"],
      "vue/prefer-use-template-ref": ["warn"],
      "vue/padding-line-between-tags": [
        "warn",
        [
          { blankLine: "always", prev: "tr", next: "tr" },
          { blankLine: "always", prev: "thead", next: "tbody" },
          { blankLine: "always", prev: "tbody", next: "tfoot" },
        ],
      ],
      "vue/no-unused-refs": ["warn"],
      "vue/no-undef-components": [
        "error",
        { ignorePatterns: ["RouterLink", "RouterView"] },
      ],
      "vue/no-duplicate-attr-inheritance": [
        "error",
        { checkMultiRootNodes: true },
      ],
      "vue/no-import-compiler-macros": ["error"],
      "vue/no-multiple-objects-in-class": ["warn"],
      "vue/no-static-inline-styles": ["error"],
      "vue/no-template-target-blank": ["error"],
      "vue/no-this-in-before-route-enter": ["error"],
      "vue/prop-name-casing": ["error", "camelCase"],
      //"vue/define-props-destructuring": ["warn"], // maybe enable this?
      "vue/custom-event-name-casing": ["warn", "camelCase"],
      "vue/no-root-v-if": ["error"],
      "vue/prefer-separate-static-class": ["warn"],
      //"vue/no-setup-props-reactivity-loss": ["error"], // maybe enable this?
      "vue/html-button-has-type": ["warn"],
      "vue/no-restricted-call-after-await": ["warn"],
      "vue/no-negated-v-if-condition": ["warn"],
      "vue/html-self-closing": [
        "warn",
        {
          html: { void: "always", normal: "always" },
          svg: "always",
          math: "always",
        },
      ],
      "vue/prefer-true-attribute-shorthand": ["warn"],
      "vue/attribute-hyphenation": [
        "warn",
        "never",
        {
          ignore: [],
          ignoreTags: [],
        },
      ],
      "vue/no-ref-object-reactivity-loss": ["warn"],
      "vue/enforce-style-attribute": ["error", { allow: ["scoped"] }],
      "vue/max-attributes-per-line": "off",
      "vue/component-api-style": ["error", ["script-setup"]],
      "vue/component-name-in-template-casing": [
        "warn",
        "PascalCase",
        {
          registeredComponentsOnly: true,
          globals: ["RouterLink", "RouterView"],
        },
      ],
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["#base", "./frontend/src/components/base"],
            ["#composables", "./frontend/src/composables"],
            ["#config", "./frontend/src/config"],
            ["#layouts", "./frontend/src/layouts"],
            ["#projects", "./frontend/src/components/projects"],
            ["#sections", "./frontend/src/components/sections"],
            ["#services", "./frontend/src/services"],
            ["#shared", "./shared/src"],
            ["#stores", "./frontend/src/stores"],
            ["#templates", "./frontend/src/components/templates"],
            ["#ui", "./frontend/src/components/ui"],
            ["#sections", "./frontend/src/components/sections"],
            ["#utils", "./frontend/src/utils"],
            ["#views", "./frontend/src/views"],
          ],
          extensions: [".js", ".ts", ".vue", ".jsx", ".tsx"],
        },
        node: {
          extensions: [".js", ".ts", ".mjs"],
          moduleDirectory: ["node_modules", "frontend/src/"],
        },
      },
    },
  },

  // Overrides for *.vue files
  {
    name: "app/vue-overrides",
    files: ["**/*.vue"],
    rules: {
      "jsdoc/require-file-overview": "off",
    },
  },

  // Overrides for Icon components
  {
    name: "app/vue-icon-overrides",
    files: ["**/*Icon.vue", "**/Icon*.vue"],
    rules: {
      "@stylistic/max-len": "off",
    },
  },

  // Overrides for vite.config.js and vitest.config.js files
  {
    name: "app/vite-and-vitest-overrides",
    files: ["**/vite.config.js", "**/vitest.config.js"],
    rules: {
      "import/order": "off",
      "import/namespace": "off",
      "import/default": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-duplicates": "off",
      "import/no-cycle": "off",
    },
  },

  // Overrides for test files
  {
    name: "app/test-overrides",
    files: ["**/*.test.js", "**/__tests__/**"],
    rules: {
      "no-magic-numbers": "off",
      "max-lines-per-function": "off",
    },
  },

  // Eslint config file overrides
  {
    name: "app/eslint-config-overrides",
    files: ["**/eslint.config.js"],
    rules: {
      "max-lines": "off",
      "no-magic-numbers": "off",
    },
  },

  // Overrides for files in config directory
  {
    name: "app/config-dir-overrides",
    files: ["**/config/*.js", "**/config/**/*.js"],
    rules: {
      "no-magic-numbers": "off",
    },
  },
]

export default config
