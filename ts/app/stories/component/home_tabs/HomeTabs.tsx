import * as React from 'react';
import {
	Container, Tab, Tabs, TabHeading,
	Icon, Text, View
} from 'native-base';
import styles from './styles'
import { SvgIcon } from 'components';

// tslint:disable-next-line:variable-name
export const IconTabHeading = (nameIcon, text) => (
	<TabHeading style={styles.verticalIcon}>
		<Icon type="MaterialIcons" style={styles.tabIcon} name={nameIcon} />
		<Text>{text}</Text>
	</TabHeading>
)

// tslint:disable-next-line:variable-name
export const SvgIconTabHeading = (nameIcon, text) => (
	<TabHeading style={styles.verticalIcon}>
		<SvgIcon style={styles.svgIcon} name={nameIcon} />
		<Text style={styles.textMargin}>{text}</Text>
	</TabHeading>
)

// tslint:disable-next-line:variable-name
export const HomeTabs = ({ children }) => {
	return (
		<Container>
			<Tabs>
				<Tab heading={SvgIconTabHeading("hatch", "Explore")}>
					{children}
				</Tab>
				<Tab heading={IconTabHeading("star", "Meus Hatches")}>
					<View />
				</Tab>
			</Tabs>
		</Container>
	)
}

/* render para menu e search
<Left style={styles.leftRightLayout}>
	<Button transparent={true}>
		<Icon name='search' />
	</Button>
</Left>
<Body>
	<Title style={styles.headerAlign}>Hatchers</Title>
</Body>
<Right style={styles.leftRightLayout}>
	<Button transparent={true}>
		<Icon name="more" />
	</Button>
</Right>
*/
