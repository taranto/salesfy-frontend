import * as React from "react";
import styles from "./styles";
import { Typography } from '@material-ui/core';

interface ILogo {
	text?:string;
	textStyle?:any;
	isBlack?:boolean;
	style?:any
}

export const SimpleText = ({ text, textStyle, style}:ILogo) => {
	return (
		<div style={{...styles.viewLogo, ...style}}>
			<Typography style={{...styles.hatchersText, ...textStyle}}>{text}</Typography>
		</div>
	)
}

export const Logo = ({ text, textStyle, style}:ILogo) => {
	return (
		<div style={{...styles.viewLogo, ...style}}>
			<img style={styles.imgHeader} src={require('assets/app-favicon.png')} />
			<Typography style={{...styles.hatchersText, ...textStyle}}>{text}</Typography>
		</div>
	)
}

export const NamedLogo = ({ isBlack, text, textStyle, style}:ILogo) => {
	let logo
	if (isBlack) {
		logo = require('assets/app-logo-black.png')
	} else if (isBlack!==undefined && !isBlack) {
		logo = require('assets/app-logo-white.png')
	} else {
		logo = require('assets/app-logo.png')
	}
	return (
		<div style={{...styles.viewLogo, ...style}}>
			<img style={styles.imgHeader} src={logo} />
			<Typography style={{...styles.hatchersText, ...textStyle}}>{text}</Typography>
		</div>
	)
}

export const LogoFastForward = () => (
	<div style={{...styles.compact}}>
		<img style={styles.imgHeader} src={require('assets/logoFastForward.png')} />
	</div>
)
