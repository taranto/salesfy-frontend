import React from 'react';
import { connect } from 'react-redux';
import { ArrowBack } from '@material-ui/icons'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

interface IProps extends RouteComponentProps {
	onBack?: any;
	children?: any;
	className?:string;
	useBackHistory?:boolean;
}

class ScreenToolbar<P, S> extends React.Component<IProps & P, S> {

	constructor(props){
		super(props)

		this.goBack = this.goBack.bind(this);
	}

	public goBack() {
		const { onBack, history } = this.props;

		if(onBack){
			onBack();
		} else {
			history.goBack();
		}
	}

	public render() {
		const { onBack, useBackHistory, children, className } = this.props;
		return (
			<div id="screen-toolbar" className={`screen-toolbar ${className}`}>
				{(useBackHistory || onBack) && <div className="left"><IconButton className="icon-back" onClick={this.goBack}><ArrowBack/></IconButton></div>}
				{children}
			</div>
		)

	}
}

export default withRouter<IProps, any>(connect()(ScreenToolbar));
