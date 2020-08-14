import * as React from "react";
import { connect } from "react-redux";
import { getContent, getContentSucess } from "./Actions"
import { PostScreen } from "screens";
import { ILoading, INavigation } from "app-core/utils/interfaces";
import { SafeAreaView } from 'react-native';

interface IProps extends INavigation, ILoading {
	dispatch: any;
	item: any;
	isLoadingWebview?: boolean;
}

class ContentContainer extends React.Component<IProps> {

	constructor(props) {
		super(props);

		this.onBack = this.onBack.bind(this);
		this.hatchIt = this.hatchIt.bind(this);
		this.onFavorite = this.onFavorite.bind(this);
		this.startLoadWebview = this.startLoadWebview.bind(this);
		this.stopLoadWebview = this.stopLoadWebview.bind(this);
	}

	public componentDidMount() {
		const { item } = this.props.navigation.state.params;

		if (item) {
			this.props.dispatch(getContent(item));
		}
	}

	public onBack = () => {
		const { navigation } = this.props

		navigation.goBack();
	}

	public hatchIt() {
		const { navigation } = this.props

		navigation.navigate("HatchIt")
	}

	public onFavorite() {

	}

	public startLoadWebview() {
		this.props.dispatch(getContentSucess({ isLoadingWebview: true }))
	}

	public stopLoadWebview() {
		this.props.dispatch(getContentSucess({ isLoadingWebview: false }))
	}

	public render() {
		const { item, isLoading, isLoadingWebview } = this.props;

		const contentProps = {
			onFavorite: this.onFavorite,
			hatchIt: this.hatchIt,
			onBack: this.onBack,
		}

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<PostScreen
					stopLoadWebview={this.stopLoadWebview}
					startLoadWebview={this.startLoadWebview}
					{...contentProps}
					item={item}
					isLoading={isLoading}
					isLoadingWebview={isLoadingWebview}
				/>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.contentReducer.isLoading,
	item: state.contentReducer.item,
	isLoadingWebview: state.contentReducer.isLoadingWebview
});

export default connect(mapStateToProps)(ContentContainer);
