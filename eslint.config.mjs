import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "out/**", // 정적 빌드 결과물
      ".wrangler/**", // wrangler 가 만드는 임시 번들
    ],
  },
];

export default eslintConfig;
