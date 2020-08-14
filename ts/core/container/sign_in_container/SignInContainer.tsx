import * as React from "react";
import { InjectedFormProps } from "redux-form";
import { ISignInContainer } from "app-core/utils/interfaces";

abstract class SignInContainer<P = {}, S = {}> extends React.Component<ISignInContainer & InjectedFormProps<{},ISignInContainer> & P, S> {

	constructor(props) {
		super(props);

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.recovery = this.recovery.bind(this);
	}

	public login() {
		const { navigation } = this.props;
		navigation.navigate("Login");
	}

	public recovery() {
		const { navigation } = this.props;
		navigation.navigate("Recovery");
	}

	public register() {
		const { navigation } = this.props;
		navigation.navigate("Register");
	}

	public abstract render();
}

export default SignInContainer;
