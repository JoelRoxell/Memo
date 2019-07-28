module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],
  moduleNameMapper: {
    '\\.(.css|scss)': 'identity-obj-proxy',
    api: '<rootDir>/src/api',
    'utils/env': '<rootDir>/src/utils/env',
    'components(.*)$': '<rootDir>/src/components/$1',
    'assets/svg/(.*)': 'identity-obj-proxy'
  },
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**']
}
