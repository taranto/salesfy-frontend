import * as React from "react";
import styles from './styles';
import { CircularLoader, PrimaryGradient } from "components";
import { Typography } from "@material-ui/core";
import { NamedLogo } from '../../component/logo/Logo';

const WaitingBuildScreen = ({ infoText }) => {
	return (
		<div style={styles.container}>
			<PrimaryGradient style={styles.container}>
				<div style={styles.container}>
					<NamedLogo isBlack={false}/>
					<CircularLoader style={styles.loader} inverse={true} />
					<Typography style={styles.waitingMessage}>{infoText}</Typography>
				</div>
			</PrimaryGradient>
		</div>
	);
}

export default WaitingBuildScreen;
