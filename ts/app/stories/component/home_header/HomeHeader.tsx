import * as React from 'react';
import {
	Icon, Header, Body, Right, Left, Button, View, Text, Subtitle
} from 'native-base';
import { FlatList, TouchableHighlight, Animated } from 'react-native';
import styles from './styles'
import { SecondaryGradient, PageCircularLoader, FireGradient } from 'app/stories/component';
import { I18n, KeyEnum } from 'salesfy-shared';
import FastImage from 'react-native-fast-image';
import platform from 'app/theme/variables/platform';
import { Field } from "redux-form";
import { S3_PATH_CONTENT } from 'root/envVars';
import { SearchFormInput } from 'app/stories/component/form/Form';

const BUTTONS = [
	// { text: "Tutorial de Hatchers", icon: "ios-school", iconColor: platform.brandPrimary, type: "tutorial" },
	{ text: "Interesses", icon: "ios-pricetags", iconColor: platform.brandPrimary, type: "tags"},
	// { text: "Termos de uso", icon: "ios-paper", iconColor: platform.brandPrimary, type: "term" },
	// { text: "Política de privacidade", icon: "ios-lock", iconColor: platform.brandPrimary, type: "privacity" },
	// { text: "Política de conteúdos", icon: "ios-book", iconColor: platform.brandPrimary, type: "content" },
	// { text: "Publique em Hatchers", icon: "ios-megaphone", iconColor: platform.brandPrimary, type: "market" },
	{ text: "Sair", icon: "ios-exit", iconColor: platform.brandPrimary, type: "logoff" }
];

// tslint:disable-next-line:variable-name
export const ProfileIcon = ({ onPress }) => (
	<Button transparent={true} onPress={onPress}><Icon name={"ios-menu"} style={styles.profileButton} /></Button>
)

// tslint:disable-next-line:variable-name
export const SearchIcon = ({ onPress, hasFilter }) => {
	return (
		<Button transparent={true} onPress={onPress}>
			<Icon name={"search"} style={styles.profileButton} />
			{hasFilter && <FireGradient style={styles.badge}><View /></FireGradient>}
		</Button>
	)
}

// tslint:disable-next-line:variable-name
export const HomeMenuButtons = () => BUTTONS;

// tslint:disable-next-line:variable-name
export const HomeHeader = (
	{ showSearch, rightButtons, leftButtons, subtitle, children, isLoading,
		data, onFilter, onCancelPress, onDsSearch, options, onEndReached }) => {

	// tslint:disable-next-line:variable-name
	const List = () => (
		<Animated.View style={{}}>
			<TagList
				isLoading={isLoading}
				data={data}
				onPress={onFilter}
				options={options}
				onEndReached={onEndReached}
			/>
		</Animated.View>)
	return (
		<SecondaryGradient style={styles.bar}>
			{showSearch ? SearchHeaderField({ onDsSearch, onCancelPress }) : HomeHeaderPrincipal({ leftButtons, subtitle, rightButtons, children })}
			{showSearch && <Text style={styles.channelText}>{I18n.t(KeyEnum.channelMessage)}</Text>}
			{showSearch && <List/>}
		</SecondaryGradient>
	)
}

// tslint:disable-next-line:variable-name
const HomeHeaderPrincipal = ({ leftButtons, rightButtons, subtitle, children }) => {
	return (
		<Header style={styles.header} hasTabs={true}>
			<Left style={{ flex: 0 }}>{leftButtons}</Left>
			<Body style={{ alignItems: "center" }}>
				<FastImage resizeMode={"contain"} style={styles.logo} source={require("assets/app-logo.png")}/>
				<Subtitle style={styles.hatchersTypographySub}>{subtitle}</Subtitle>
			</Body>
			<Right style={{ flex: 0 }}>{rightButtons}</Right>
			{children}
		</Header>
	)
}

// <Title style={styles.hatchersTypography}>{I18n.t(KeyEnum.Salesfy).toLocaleLowerCase()}</Title>

// tslint:disable-next-line:variable-name
const SearchHeaderField = ({ onDsSearch, onCancelPress }) => {
	// tslint:disable-next-line:variable-name
	const LeftIcon = () => (
		<Left style={styles.autoWidth}>
			<Button onPress={onCancelPress} transparent={true}>
				<Icon style={styles.leftIcon} name='ios-arrow-round-back' />
			</Button>
		</Left>
	);
	return (
		<Header style={styles.header} searchBar={true} hasTabs={true}>
			{platform.platform !== 'ios' && <LeftIcon />}
			<Field
				name="dsSearch"
				icon="search"
				iconStyle={styles.profileButton}
				label={I18n.t(KeyEnum.filter)}
				component={SearchFormInput}
				autoCapitalize={"none"}
				style={styles.searchItem}
				onSubmitEditing={onDsSearch}
				onCancelPress={onCancelPress}
				placeholderTextColor={platform.toolbarDefaultBg}
			/>
			<Button transparent={true} onPress={onCancelPress}>
				<Text>{I18n.t(KeyEnum.cancel)}</Text>
			</Button>
		</Header>
	)
}

// tslint:disable-next-line:variable-name
export const TagList = ({ isLoading, data, onPress, options, onEndReached }) => {
	// if (data.length === 0) { return initialLoading(isLoading) }

	return (
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			onEndReachedThreshold={0.6}
			onEndReached={onEndReached}
			removeClippedSubviews={true}
			data={data}
			renderItem={item => renderItem(item, onPress, options)}
			keyExtractor={keyExtractor}
			ListFooterComponent={listLoading(isLoading)}
			style={styles.tagList}
		/>
	)
}

const listLoading = (isLoading) => {
	return isLoading ? <View style={styles.card}><PageCircularLoader /></View> : <View />;
}
const keyExtractor = ({ idChannel }) => idChannel.toString();
const renderItem = ({ item }, onPress, options) => {
	return <TagListCard {...item} options={options} onPress={onPress} />
}

// tslint:disable-next-line:variable-name
export const TagListCard = (item) => {
	const { idChannel, piChannel, options, onPress } = item;
	const onTouch = () => onPress(idChannel);

	const image = {
		uri: `${S3_PATH_CONTENT}/${piChannel}`,
		priority: FastImage.priority.normal
	}

	return (
		// tslint:disable-next-line:jsx-no-lambda
		<TouchableHighlight underlayColor="#cec4c4" style={styles.card} onPress={onTouch}>
			<FastImage key={idChannel} source={image} style={options && options.idChannel === item.idChannel ? styles.cardImageFocus : styles.cardImage} />
		</TouchableHighlight>
	)
}
