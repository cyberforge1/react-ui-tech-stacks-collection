/** 
 * @type {import('ts-jest').JestConfigWithTsJest} 
 * Filepath: jest.config.js
 */

export default {
  testEnvironment: "node", // Use Node.js as the test environment
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Transform TypeScript files with ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Recognize TS, TSX, JS, and JSX files
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"], // Match test files with .test.ts or .test.tsx extensions
  collectCoverage: true, // Enable test coverage reporting
  coverageDirectory: "coverage", // Specify output directory for coverage reports
  coverageReporters: ["text", "lcov"], // Include text and lcov formats for coverage reports
};
