export default {
  "apps/api/**/*.{js,ts}": [
    "pnpm --filter api eslint --fix --",
  ],
  "apps/web/**/*.{js,jsx,ts,tsx,vue}": [
    "pnpm --filter web eslint --fix --",
  ],
};
