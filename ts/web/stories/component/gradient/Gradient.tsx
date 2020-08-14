import * as React from 'react';

interface IGradient {
	children: any,
	style?: any
	horizontal?: boolean
	inverse?: boolean
}

export const PrimaryGradient = ({ children, style }: IGradient) => {
	const gradient = { background: 'linear-gradient(to right bottom, #670000, #e02b20)'};

	return (
		<div style={{...style, ...gradient}}>
			{children}
		</div>
	)
}

export const PurpleGradient = ({ children, style }: IGradient) => {
	const gradient = { background: 'linear-gradient(to right bottom, #2b5876, #4e4376)'};

	return (
		<div style={{...style, ...gradient}}>
			{children}
		</div>
	)
}

export const FireGradient = ({ children, style }: IGradient) => {
	const gradient = { background: 'linear-gradient(to top bottom, #f0658f", "#fe8768)'};

	return (
		<div style={{...style, ...gradient}}>
			{children}
		</div>
	)
}

export const ShadeGradient = ({ children, style, inverse }: IGradient) => {
	const direction = inverse ? "bottom top" : "top bottom";
	const gradient = { background: `linear-gradient(to ${direction}, transparent, #7f7f7f)`};

	return (
		<div style={{...style, ...gradient}}>
			{children}
		</div>
	)
}
