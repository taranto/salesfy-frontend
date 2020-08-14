import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import platform from 'app/theme/variables/platform';

interface IGradient {
	children: any,
	style?: any,
	horizontal?: boolean,
	inverse?:boolean
}
// tslint:disable-next-line:variable-name
export const PrimaryGradient = ({ children, style, horizontal }: IGradient) => {
	let props = {}
	if (horizontal) {
		props = {
			start: { x: 0, y: 1 },
			end: { x: 1, y: 0 }
		}
	}
	return (
		<LinearGradient {...props} locations={[0, 0.5, 1]} style={style} colors={['#670000', '#e02b20']}>
			{children}
		</LinearGradient>
	)
}

export const SecondaryGradient = ({ children, style, horizontal }: IGradient) => {
	let props = {}
	if (horizontal) {
		props = {
			start: { x: 0, y: 1 },
			end: { x: 1, y: 0 }
		}
	}
	return (
		<LinearGradient {...props} locations={[0, 0.5, 1]} style={style} colors={['white', 'white']}>
			{children}
		</LinearGradient>
	)
}

// tslint:disable-next-line:variable-name
export const PurpleGradient = ({ children, style, horizontal }: IGradient) => {
	let props = {}
	if (horizontal) {
		props = {
			start: { x: 0, y: 1 },
			end: { x: 1, y: 0 }
		}
	}
	return (
		<LinearGradient {...props} locations={[0, 1]} style={style} colors={["#2b5876", "#4e4376"]}>
			{children}
		</LinearGradient>
	)
}

// tslint:disable-next-line:variable-name
export const FireGradient = ({ children, style, horizontal }: IGradient) => {
	let props = {}
	if (horizontal) {
		props = {
			start: { x: 0, y: 1 },
			end: { x: 1, y: 0 }
		}
	}
	return (
		<LinearGradient {...props} locations={[0, 1]} style={style} colors={["#f0658f", "#fe8768"]}>
			{children}
		</LinearGradient>
	)
}

// tslint:disable-next-line:variable-name
export const ShadeGradient = ({ children, style, inverse }: IGradient) => {
	let props = {}
	if (inverse) {
		props = {
			start: { x: 0, y: 1 },
			end: { x: 0, y: 0 }
		}
	}
	return (
		<LinearGradient {...props} locations={[0, 1]} style={style} colors={["transparent", platform.categoryText]}>
			{children}
		</LinearGradient>
	)
}
