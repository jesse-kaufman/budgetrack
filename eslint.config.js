/** @file Config for eslint. */
import { globalIgnores } from "@eslint/config-helpers"
import pluginJs from "@eslint/js"
import jsdoc from "eslint-plugin-jsdoc"
import importPlugin from "eslint-plugin-import"
import globals from "globals"
import eslintPluginPrettier from "eslint-plugin-prettier"
import pluginVue from "eslint-plugin-vue"
import pluginVitest from "@vitest/eslint-plugin"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"

const config = [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
  ]),

  // Add global plugins
  {
    name: "app/plugins",
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },

  // Let Prettier handle formatting
  skipFormatting,

  // Various plugin configs
  importPlugin.flatConfigs.recommended,
  pluginJs.configs.recommended,
  jsdoc.configs["flat/recommended"],

  // Add config for Vue (required at top-level instead of with overrides)
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/essential"],

  {
    name: "app/base-config",
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".mjs"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
    rules: {
      "prettier/prettier": "error", // Run Prettier as an ESLint rule
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
      semi: ["error", "never"],
      complexity: ["warn", { max: 8 }],
      curly: ["error", "multi-line", "consistent"],
      "default-case-last": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      "multiline-comment-style": ["error", "starred-block"],
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
        "error",
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
        { ignoreArrayIndexes: true, ignore: [-1, 0, 1, 2], enforceConst: true },
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
      "import/order": "warn",
      "jsdoc/check-param-names": ["error", { enableFixer: true }],
      "jsdoc/require-description": "error",
      "jsdoc/require-hyphen-before-param-description": "warn",
      "jsdoc/require-description-complete-sentence": "warn",
      "jsdoc/check-line-alignment": "error",
      "jsdoc/check-syntax": "error",
      "jsdoc/check-values": "warn",
      "jsdoc/informative-docs": "warn",
      "jsdoc/no-undefined-types": "error",
      "jsdoc/require-file-overview": ["error"],
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
      "eol-last": ["error", "always"],
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true, // Only report exports
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          contexts: [
            "ArrowFunctionExpression",
            "ClassDeclaration",
            "ClassExpression",
            "ClassProperty",
            "FunctionDeclaration", // Function
            "FunctionExpression",
            "MethodDefinition",
            "TSDeclareFunction", // Function without body
            "TSEnumDeclaration",
            "TSInterfaceDeclaration",
            "TSModuleDeclaration", // Namespace
            "TSTypeAliasDeclaration",
            "VariableDeclaration",
          ],
        },
      ],
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

  // Backend workspace overrides
  {
    name: "app/backend-workspace",
    files: ["backend/**"],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["#config", "./backend/src/config"],
            ["#modules", "./backend/src/modules"],
            ["#controllers", "./backend/src/controllers"],
            ["#repositories", "./backend/src/repositories"],
            ["#services", "./backend/src/services"],
            ["#errors", "./backend/src/errors"],
            ["#utils", "./backend/src/utils"],
            ["#models", "./backend/src/models"],
            ["#middlewares", "./backend/src/middlewares"],
            ["#routes", "./backend/src/routes"],
          ],

          extensions: [".js", ".ts", ".vue", ".jsx", ".tsx"],
        },
      },
    },
  },

  // Frontend workspace overrides
  {
    name: "app/frontend-workspace",
    files: ["frontend/**"],
    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./frontend/src"]],
          extensions: [".js", ".ts", ".vue", ".jsx", ".tsx"],
        },
      },
    },
    rules: {
      "vue/no-v-html": "error", // Big NO : sensible to XSS
      "vue/html-indent": 0,
      "vue/singleline-html-element-content-newline": 0,
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
    },
  },

  // Test file overrides
  {
    name: "app/test-overrides",
    files: ["**/*.test.js", "**/__tests__/**"],
    ...pluginVitest.configs.recommended,
    rules: {
      "no-magic-numbers": "off",
      "max-lines-per-function": "off",
    },
  },

  // Config file overrides
  {
    name: "app/config-overrides",
    files: ["**/*.config.js", "**/config/*.js"],
    rules: {
      "no-magic-numbers": "off",
    },
  },

  // Vue component file overrides
  {
    name: "app/vue-component-overrides",
    files: ["**/*.vue"],
    rules: {
      "jsdoc/require-file-overview": "off",
    },
  },

  // Eslint config file overrides
  {
    name: "app/eslint-config-overrides",
    files: ["**/eslint.config.js"],
    rules: {
      "max-lines": "off",
    },
  },

  // Vite/vitest config file overrides
  {
    name: "app/vite-vitest-config-overrides",
    files: ["**/vite.config.js", "**/vitest.config.js"],
    rules: {
      "import/order": "off",
      "import/namespace": "off",
      "import/default": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-duplicates": "off",
    },
  },
]

export default config
