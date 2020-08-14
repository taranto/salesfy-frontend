import React from 'react';
import ContentListContainer from 'app-core/container/content_list_container/ContentListContainer';

class ChannelContentListContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	public render(){
		return <ContentListContainer {...this.props} isChannel={true}/>;
	}
}

export default ChannelContentListContainer;
