import React from 'react';
import { ILocation } from 'app-core/utils/interfaces/index';

abstract class ScreenLocation<P={}, S={}> extends React.Component<P & ILocation, S> {

	public unlisten;
	public pathname;
	constructor(props) {
		super(props);
	}

	public componentWillMount() {
		this.onLocationChange(this.props.location);
		this.pathname = this.props.location.pathname;
		this.unlisten = this.props.history.listen((location) => {
			if(this.pathname === location.pathname){
				this.onLocationChange(location);
			}
		});
	}

	public abstract onLocationChange(location);

	public componentWillUnmount() {
		if(this.unlisten){
			this.unlisten();
		}
	}
}

export default ScreenLocation;
