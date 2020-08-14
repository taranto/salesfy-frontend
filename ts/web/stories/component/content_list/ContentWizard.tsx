import React, { useState } from 'react';
import { Card, GridListTile, IconButton, Tooltip, Typography } from '@material-ui/core';
// import { Logo } from 'components';
import { Translation } from 'app-core/utils/translate/Translation';
import { PrepareButton, CancelButton } from 'web/stories/component/button/Button';
import { CircularLoader } from 'web/stories/component/loader/Loader';
import { WarningOutlined } from '@material-ui/icons';
import styles from "./styles";
import { LogoFastForward } from 'web/stories/component/logo/Logo';

export const ContentWizard = ({ prepareLinks, setLinks, loading, links, errors }) => {
	const [step, setStep] = useState(0);

	const onNewItem = (link) => {
		if (link) {
			window.open(link, "_blank");
		}

		setStep(1);
	}

	return (
		<GridListTile key={`new-item`} cols={1} rows={1}>
			<Card className={`card full wizard`} >
				<div className="wizard-container">
					<Wizard {...{ step, setStep, setLinks, prepareLinks, onNewItem, links, errors }} loading={loading} />
				</div>
			</Card>
		</GridListTile>
	)
}

const Preparing = () => {
	return (
		<>
			<LogoFastForward />
			<Typography style={{ ...styles.hatchersText, ...styles.viewLogo, fontSize: 18, marginBottom:15, marginLeft: 30, marginRight: 30, textAlign: "center" }}>{Translation.preparingContent}</Typography>
			<CircularLoader />
		</>
	)
}

const Wizard = (props) => {
	const { step, loading } = props;

	if (loading) {
		return <Preparing />
	}

	if (step === 1) {
		return <ContentPrepare {...props} />
	} else {
		return <NewContent {...props} />
	}

}

const NewContent = ({ onNewItem }) => {
	return (
		<>
			<LogoFastForward />
			<Typography style={{ ...styles.hatchersText, ...styles.viewLogo, marginBottom: 15, fontSize: 18, marginLeft: 30, marginRight: 30, textAlign: "center" }} >{Translation.addContentWizard}</Typography>
			<div className="buttons-container">
				<IconButton onClick={() => onNewItem()}><img className="img-button" src={require("assets/link.png")} /></IconButton>
			</div>
		</>
	)
}

const Warning = ({ errors }) => {
	const error = (
		<span>
			<p>{Translation.theresUnrecognizedLinks}</p>
			{errors.map(link => {
				return <p key={link}>{link}</p>
			})}
		</span>
	)
	return (
		<Tooltip title={error}>
			<WarningOutlined className="warning" />
		</Tooltip>
	)
}

const ContentPrepare = ({ setStep, setLinks, prepareLinks, errors }) => {
	return (
		<>
			<LogoFastForward />
			<Typography style={{ ...styles.hatchersText, ...styles.viewLogo, marginBottom: 5, fontSize: 18, marginLeft: 30, marginRight: 30, textAlign: "center" }} >{Translation.prepareLink}</Typography>
			<textarea
				className={`link-area`}
				placeholder={Translation.linkInfoPlaceholder}
				onChange={(e) => setLinks(e.target.value)}
				ref={input => input && input.focus()}
			/>
			<div className="footer-actions">
				{(errors && errors.length > 0) && <Warning errors={errors} />}
				<CancelButton className="cancel-button" onClick={() => setStep(0)} />
				<PrepareButton className="prepare-button" placeholder={"Preparar"} onClick={prepareLinks} />
			</div>
		</>
	)
}

/*
	<IconButton onClick={() => onNewItem("https://www.salesfy.com.br")}><img className="img-button" src={require("assets/trello.png")} /></IconButton>
	<IconButton onClick={() => onNewItem("https://www.salesfy.com.br")}><img className="img-button" src={require("assets/drive.png")} /></IconButton>
*/
