declare module "*.json" {
	const value: any;
	export default value;
}

import ReactNative from 'react-native'

declare module 'react-native' {
    export interface ListViewStatic extends ReactNative.ListView{}
    export interface ScrollViewStatic extends ReactNative.ScrollView{}
    export interface ViewStatic extends ReactNative.View{}
}

import ReactNavigation from 'react-navigation'

declare module 'react-navigation' {
    export const createStackNavigator = ReactNavigation.createStackNavigator;
}