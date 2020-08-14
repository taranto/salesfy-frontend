import * as React from 'react';
import styles from './styles'
import { Spinner, Container } from 'native-base'

interface ISpinner {
	size?:number | "small" | "large"
	inverse?: boolean;
	style?: any;
}

// tslint:disable-next-line:variable-name
export const CircularLoader = ({ inverse, size }: ISpinner) => {
	return <Spinner inverse={inverse} size={size}/>
}

// tslint:disable-next-line:variable-name
export const PageCircularLoader = ({ inverse, style }: ISpinner) => {
	const containerStyle = inverse ? styles.inverseBgColor: {};
	return (
		<Container style={[styles.viewLoader, containerStyle, style]}>
			<Spinner inverse={inverse}/>
		</Container>
	)
}
