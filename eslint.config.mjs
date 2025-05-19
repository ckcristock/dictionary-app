import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 🔧 Aquí defines tus reglas personalizadas
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ⚠️ Solo si necesitas quitarlo
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            "{}": false, // permite usar {}
          },
        },
      ],
    },
  },
];

export default eslintConfig;
