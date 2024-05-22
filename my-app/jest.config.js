module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['./jest-setup.ts'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  