export default {
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.jsx'],
  testMatch: [
    '**/__tests__/**/*.[jt]sx',
    '**/?(*.)+(spec|test).[jt]sx',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|s[ac]ss)$': 'identity-obj-proxy',
  },
};