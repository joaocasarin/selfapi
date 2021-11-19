module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/tests/**/*.(test|spec).(js|ts)'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '.prettierrc.js',
        '.eslintrc.js',
        'jest.config.js'
    ],
    coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
