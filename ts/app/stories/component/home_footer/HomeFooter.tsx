import * as React from 'react';
import {
	FooterTab, Footer, Button, Icon
} from 'native-base';
import { Image } from 'react-native';
import styles from './styles';

// tslint:disable-next-line:variable-name
export const HomeFooter = (
	{ onPressFeed, showFeed, onPressChannelsAward,
		onPressNewHatch, onPressChannels, showChannelsAward,
		onPressFavorite, showFavorite, showNewHatch, showChannels }) => {
	return (
		<Footer style={styles.footer}>
			<FooterTab>
				<Button active={showFeed} onPress={onPressFeed}>
					<Icon style={styles.hatchIcon} name="home" />
				</Button>
				<Button active={showChannelsAward} onPress={onPressChannelsAward}>
					<Icon style={styles.hatchIcon} name="compass" />
				</Button>
				<Button active={showNewHatch} onPress={onPressNewHatch}>
					<Image style={styles.hatchSvgIcon} resizeMode="contain" source={require('assets/app-favicon.png')} />
				</Button>
				<Button active={showChannels} onPress={onPressChannels}>
					<Icon style={styles.hatchIcon} name="albums" />
				</Button>
				<Button active={showFavorite} onPress={onPressFavorite}>
					<Icon style={styles.hatchIcon} name="bookmark" />
				</Button>
			</FooterTab>
		</Footer>
	)
}
