export default {
  preset: "ts-jest/presets/default-esm", // ESM 対応の Jest 設定
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true, // TypeScript を ESM でコンパイル
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // エイリアス設定
    "\\.(css|less)$": "identity-obj-proxy",
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.app.json", // Jest に tsconfig.app.json を使用させる
      useESM: true, // ESM を有効にする
    },
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // ESM として扱う拡張子
};