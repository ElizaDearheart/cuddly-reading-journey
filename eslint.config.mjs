import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,

  {
    rules: {
      "prefer-const": "warn",
      "vars-on-top": "warn",
    },
  },
];
