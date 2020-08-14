import * as React from "react";
import { CircularLoader } from "components"
import { ILoading } from "app-core/utils/interfaces";
import styles from "./styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Translation } from "app-core/utils/translate/Translation";
import { LK_PLAYSTORE, LK_ABOUT, LK_TERMS, LK_APPLESTORE, LK_DEMO } from 'root/envVars';
import { NamedLogo } from "web/stories/component/logo/Logo";

interface IProps extends ILoading {
	children: JSX.Element[];
	isPasswordRecovery:boolean
}

export const SignIn = ({ children, isLoading, isPasswordRecovery }: IProps) => {
	return isLoading ? <CircularLoader /> : (
		<div style={styles.container}>
			<div className="login-image">
				<NamedLogo isBlack={true}/>
			</div>
			<Card className="card-login">
				<Typography variant="h5" component="h2">
					{isPasswordRecovery?Translation.recoverYourPassword:Translation.doYourLogin}
				</Typography>
				<CardContent>
					{children}
				</CardContent>
			</Card>
			<Social/>
			<Site/>
		</div>
	);
}

export const Social = () => {
	return (
		<div className="store-container">
			<a target="_blank" href={LK_PLAYSTORE} style={styles.socialButton} ><img src={require("assets/google-play.png")} /></a>
			<a target="_blank" href={LK_APPLESTORE} style={styles.socialButton}><img src={require("assets/apple-store.png")} /></a>
		</div>
	)
}

export const Site = () => {
	return (
		<div className="site-links">
			<a target="_blank" href={LK_ABOUT}>{Translation.about}</a>
			<a target="_blank" href={LK_TERMS}>{Translation.terms}</a>
		</div>
	)
}

export const NoAccount = ({isPasswordRecovery, setPasswordRecovery}) => {
	return (
		<div className="no-account-links">
			<a target="_blank" href={LK_DEMO}>{Translation.iHaveNoAccount}</a>
			<a style={{cursor:'pointer'}} onClick={()=>setPasswordRecovery(!isPasswordRecovery)}>
				{isPasswordRecovery?Translation.toLogin:Translation.iForgotMyPassword}
			</a>
		</div>
	)
}
