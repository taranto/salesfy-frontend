import * as React from "react";
import { Container, Content } from "native-base";
import styles from "./styles";
import { CircularLoader, PrimaryGradient } from "components"
import { ILoading } from "app-core/utils/interfaces";
import { AppLogo } from "app/stories/screen/transition_screen/TransitionScreen";

interface IProps extends ILoading {
	children: JSX.Element[];
}

// tslint:disable-next-line:variable-name
export const SignIn = ({ children, isLoading }: IProps) => {
	return isLoading ? <CircularLoader /> : (
		<Container>
			<PrimaryGradient style={styles.container}>
				<Content contentContainerStyle={styles.container}>
					<AppLogo/>
					{children}
				</Content>
			</PrimaryGradient>
		</Container>
	);
}
