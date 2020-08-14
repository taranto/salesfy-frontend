import * as React from "react";
import { connect } from "react-redux";
import { ILoading, INavigation } from "app-core/utils/interfaces";
import { TagList } from "app/stories/component/tag_list/TagList";
import { getTagList, setUserTagList, removeUserTagList } from "app-core/redux_store/tag/Actions";
import { LIST_LIMIT_DEFAULT } from 'root/envVars';

interface ITagListContainer extends ILoading, INavigation {
	items: any[],
	remaining: boolean,
	offset: number,
	dispatch: any,
	options?: any;
	userTagLoading?:number
}

class TagListContainer extends React.Component<ITagListContainer> {

	constructor(props) {
		super(props);

		this.onSign = this.onSign.bind(this);
		this.onUnsign = this.onUnsign.bind(this);
	}

	public componentWillMount(){
		const { remaining, isLoading, offset, options } = this.props;

		if (!isLoading && remaining) {
			this.props.dispatch(getTagList(LIST_LIMIT_DEFAULT, offset, options));
		}
	}

	public onSign(item) {
		this.props.dispatch(setUserTagList(item.idTag));
	}

	public onUnsign(item) {
		this.props.dispatch(removeUserTagList(item.idTag));
	}

	public render() {
		const { items, isLoading, remaining, userTagLoading } = this.props;

		return (
			<TagList
				isRemaining={remaining}
				isLoading={isLoading}
				data={items}
				extraData={this.props}
				onSign={this.onSign}
				onUnsign={this.onUnsign}
				userTagLoading={userTagLoading}
			/>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.tagList.isLoading,
	items: state.tagList.items,
	offset: state.tagList.offset,
	remaining: state.tagList.remaining,
	options: state.tagList.options,
	userTagLoading: state.tagList.userTagLoading
});

export default connect(mapStateToProps)(TagListContainer);
