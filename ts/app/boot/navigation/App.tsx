import React from 'react';
import { connect } from "react-redux";
import { createStackNavigator, DrawerNavigator } from "react-navigation";
import {
	HomePageContainer, ContentContainer
} from "containers";
import {
	reduxifyNavigator,
	createNavigationReducer,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import CreateHatchesContainer from "app/container/create_hatches_container/CreateHatchesContainer";
import SelectHatchTypeContainer from "app/container/select_hatch_type_container/SelectHatchTypeContainer";
import ImportHatchesContainer from "app/container/import_hatches_container/ImportHatchesContainer";
import { Dimensions } from "react-native";
import SidebarContainer from "app/container/sidebar_container";
const deviceWidth = Dimensions.get("window").width;

const Home = DrawerNavigator(
	{
		HomeContainer: { screen: HomePageContainer },
	},
	{
		drawerWidth: deviceWidth - 50,
		drawerPosition: "left",
		contentComponent: (props: any) => <SidebarContainer {...props} />,
	}
);

const AppNavigator = createStackNavigator(
	{
		Home: { screen: Home },
		Content: { screen: ContentContainer },
		SelectTypeNewHatch: { screen: SelectHatchTypeContainer },
		NewHatch: { screen: CreateHatchesContainer },
		ImportHatch: { screen: ImportHatchesContainer }
	},
	{
		initialRouteName: "Home",
		headerMode: "none",
	}
);

export const navAppReducer = createNavigationReducer(AppNavigator);

const navState = state => state.nav;

export const middlewareApp = createReactNavigationReduxMiddleware("App",
	navState
);

const App = reduxifyNavigator(AppNavigator, "App");

const mapStateToProps = (state) => ({
	state: state.navAppReducer
});
export default connect(mapStateToProps)(App);
