import React from "react";

interface IProps {
	autoHide:boolean;
	duration:number;
	message:string;
}

class ActionSheet extends React.Component<IProps> {

	constructor(props) {
		super(props);
	}

	public render() {
		return (
			<div/>
		);
	}
}

export default ActionSheet;
