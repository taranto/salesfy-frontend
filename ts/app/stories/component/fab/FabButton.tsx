import React from 'react';
import { Fab } from 'native-base';

interface IProps {
	children: JSX.Element[]
}

interface IState {
	active: boolean;
}

export default class FabButton extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			active: true
		};

		this.changeState = this.changeState.bind(this);
	}

	public componentDidMount() {
		this.setState({ active: false })
	}

	public changeState() {
		this.setState({ active: !this.state.active })
	}

	public render() {
		const { children } = this.props;

		return (
			<Fab
				active={this.state.active}
				direction="up"
				style={{ backgroundColor: '#5067FF' }}
				position="bottomRight"
				onPress={this.changeState}
			>
				{this.state.active ? children : children[0]}
			</Fab>
		);
	}
}
