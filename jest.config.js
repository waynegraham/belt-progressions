import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.[jt]sx", "**/?(*.)+(spec|test).[jt]sx"],
  moduleNameMapper: {
    "\\.(css|less|s[ac]ss)$": "identity-obj-proxy",
  },
};

export default createJestConfig(customJestConfig);
