import * as React from "react";
import SelectHatchTypeScreen from "app/stories/screen/select_hatch_type_screen/SelectHatchTypeScreen";

interface IProps {
	dispatch: any
	navigation:any;
}

class SelectHatchTypeContainer extends React.Component<IProps> {

	constructor(props) {
		super(props)
	}

	public render() {
		const { navigation } = this.props;
		return (
			<SelectHatchTypeScreen navigation={navigation}/>
		);
	}
}

export default SelectHatchTypeContainer;
