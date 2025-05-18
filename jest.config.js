/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/app/components/$1",
    "^@/contexts/(.*)$": "<rootDir>/src/app/contexts/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/app/hooks/$1",
    "^@/store/(.*)$": "<rootDir>/src/app/store/$1",
    "^@/utils/(.*)$": "<rootDir>/src/app/utils/$1",
    "^@/types/(.*)$": "<rootDir>/src/app/types/$1",
    "^.+\\.(css|scss|png|jpg|jpeg|svg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
