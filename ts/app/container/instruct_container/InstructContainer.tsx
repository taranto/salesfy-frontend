import * as React from "react";
import { InstructList, IntroButton } from "app/stories/component/instruct_list/InstructList";
import data from "./data";
import { Container } from "native-base";
import { I18n, KeyEnum } from "salesfy-shared";

interface IProps {
	navigation: any;
}

class InstructContainer extends React.Component<IProps> {

	constructor(props) {
		super(props);

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
	}

	public register() {
		this.props.navigation.navigate("Register");
	}

	public login() {
		this.props.navigation.navigate("Login");
	}

	public render() {
		return (
			<Container>
				<InstructList data={data} />
				<IntroButton text={I18n.t(KeyEnum.doLogin)} left={false} onPress={this.login}/>
				<IntroButton text={I18n.t(KeyEnum.register)} left={true} onPress={this.register}/>
			</Container>
		);
	}
}

export default InstructContainer;
