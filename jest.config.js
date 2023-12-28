module.exports = {
  bail: true,
  coverageProvider: "v8",

  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
}