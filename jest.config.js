const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    "^react-syntax-highlighter/dist/esm/(.*)$": "react-syntax-highlighter/dist/cjs/$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // ou "ts-jest", conforme seu setup
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-syntax-highlighter)"
  ]
}

module.exports = createJestConfig(customJestConfig)
