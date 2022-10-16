# Welcome to Salesfy Project

For further explanations about the Salesfy project, please visit [taranto/salesfy-project](https://github.com/taranto/salesfy-project)


## Get Started

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html) (Section "Building Projects with Native Code" > Development Os "Linux" > Target OS: Android)

### 2. Installation

On the command prompt run the following commands

$ yarn install

### Run on iOS


### Run on Android

  * Authorize device (https://facebook.github.io/react-native/docs/running-on-device)

  * Opt:
		*	Run `yarn start` in your terminal
		*	Run `yarn android` in your other terminal WITH CONNECTED DEVICE

### Run on WEB

  * Opt:
		*	Run `yarn to-workspace-web` in your terminal to change tsconfig
		*	Run `yarn web-dev` in your other terminal to run web server in dev

  * Obs: In ts/envVars you can change BE_URL -> export const BE_URL = IS_DEVELOPMENT ? 'http://10.0.0.103:3001' : 'https://be.hatchers.com.br';



