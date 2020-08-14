import * as React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'app-core/resources/selection.ts';
import { Text } from 'native-base';

// tslint:disable-next-line:variable-name
export const IconSetFromIconMoon = createIconSetFromIcoMoon(icoMoonConfig);

// tslint:disable-next-line:variable-name
export const SvgIcon = (props) => {
	return (
		<Text>
			<IconSetFromIconMoon {...props} />
		</Text>
	)
}

// tslint:disable-next-line:variable-name
export const SimpleSvgIcon = (props) => {
	return <IconSetFromIconMoon {...props} />
}
