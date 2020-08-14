import * as React from "react";
import { filterTimeSubmit } from 'app-core/utils/delay_control/DelayControl';
import { FilterInput } from "web/stories/component/filter/Filter";

class FilterContainer extends React.Component<{ onFilterChange }, { any? }> {

	constructor(props) {
		super(props);

		this.state = {}

		this.onFilter = this.onFilter.bind(this);
	}

	public onFilter(field, value) {
		this.setState({[field]: value})
		filterTimeSubmit(() => {
			if(this.props.onFilterChange){
				this.props.onFilterChange(this.state)
			}
		})
	}

	public render(){
		return <div className="filter-container"><FilterInput onChange={event => this.onFilter("dsSearch", event.target.value)} /></div>
	}
}

export default FilterContainer;
