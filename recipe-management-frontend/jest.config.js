module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Transform JS/TS files using babel-jest
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Setup file if you have any (e.g., for enzyme or jest-dom)
    transformIgnorePatterns: [
      'node_modules/(?!(my-es-module)/)', // Uncomment and adjust if you need to transform ES modules in node_modules
    ],
  };
  