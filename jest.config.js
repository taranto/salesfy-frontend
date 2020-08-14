module.exports = {
    "bail": true,
    "verbose": true,
    "preset": "react-native",
    "transform": {
      "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.tsx?$": "ts-jest"
    },
    "setupTestFrameworkScriptFile": "<rootDir>/config/jest_setup",
    "automock": false,
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    },
    "moduleNameMapper": {
      "^utils(.*)$": "<rootDir>/ts/utils$1",
      "^app-core(.*)$": "<rootDir>/ts/core$1",
      "^app(.*)$": "<rootDir>/ts/app$1",
      "^assets(.*)$": "<rootDir>/assets$1",
      "^containers(.*)$": "<rootDir>/ts/app/container$1",
      "^components(.*)$": "<rootDir>/ts/app/stories/component$1",
      "^screens(.*)$": "<rootDir>/ts/app/stories/screen$1"
    },
    "coveragePathIgnorePatterns": [
      "<rootDir>/ts/core/communication/",
      "<rootDir>/ts/app/container/.*/Actions.ts",
      "<rootDir>/ts/app/theme/",
      "<rootDir>/node_modules/",
      "<rootDir>/ts/utils/redux"
    ],
    "testPathIgnorePatterns": [
      "ts/test/util"
    ],
    "testRegex": "(/test/.*/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "globals": {
      "ts-jest": {
        "useBabelrc": true
      }
    },
    "transformIgnorePatterns": [
      "ts/web/",
      "node_modules/(?!native-base-shoutem-theme|react-native-easy-grid|react-native|react-native-keychain|react-navigation-redux-helpers|bugsnag-react-native|)"
    ]
};
