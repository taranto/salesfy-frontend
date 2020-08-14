import React from 'react';
import styles from './styles'
import { View, Text } from 'native-base';

interface IHeaderTitle {
	title: string;
	description?: string;
}

export const ListHeaderTitle = ({ title, description }:IHeaderTitle) => {
	return (
		<View style={styles.headerList}>
			<Text style={styles.headerMessage}>{title}</Text>
			{description && <Text style={styles.description} note={true}>{description}</Text>}
		</View>
	)
}
