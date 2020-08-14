import * as React from "react";
import { Column, Action, Options } from 'material-table'

abstract class ListComponent<P ={}, S = {}> extends React.Component<P, S> {

	constructor(props) {
		super(props);
	}

	public abstract getColumns() : Column<any>;
	public getActions() : (Action<any> | Array<((rowData: any) => Action<any>)>) {
		return []
	}
	public abstract getOptions() : Options;
}

export default ListComponent;
