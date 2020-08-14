import * as React from 'react';
import { I18n, KeyEnum } from 'salesfy-shared';
import { Button, Typography, Checkbox, Input } from '@material-ui/core';

export const FormInput = ({ input, label, secureTextEntry, meta, ...custom }) => (
	<Input
		placeholder={label}
		className="form-input form-custom-input-render"
		type={secureTextEntry ? "password" : "text"}
		{...input}
		{...custom}
	/>
)

export const SimpleFormInput = ({ input, label, meta, ...custom }) => (
	<Input
		placeholder={label}
		className="form-custom-input-render"
		{...input}
		{...custom}
	/>
)

interface IFormButtons {
	submitText: string, submitPress: () => void,
	linkText?: string, linkPress?: () => void,
	subLinkText?: string, subLinkPress?: () => void
	errorMessage?: string;
}

export const FormButtons =
	({ submitText, submitPress, errorMessage }: IFormButtons) => {
		return (
			<div className="view-buttons">
				<span className="submit-error-message">{errorMessage}</span>
				<Button variant="outlined" className="submit-button" onClick={submitPress}>
					<Typography className="submit-text">{submitText}</Typography>
				</Button>
			</div>
		)
	}

/*
const subLinkButton = subLinkText && (
			<Button style={styles.linkButton} size="small" onClick={subLinkPress} >
				<Typography style={styles.linkButtonColor}>{subLinkText}</Typography>
			</Button >
		)
<Button style={styles.linkButton} size="small" onClick={linkPress}>
					<Typography style={styles.linkButtonColor}>{linkText}</Typography>
				</Button>
				{subLinkButton}
*/
export const AcceptTerms = ({ checked, changeAcceptTerms, goToTermsOfUse }) => (
	<div className="container-checkbox">
		<Checkbox
			checked={checked}
			onClick={changeAcceptTerms}
		/>
		<Typography>{`${I18n.t(KeyEnum.iAccept, { context: "the" })} `}
			<Typography onClick={goToTermsOfUse}>
				{I18n.t(KeyEnum.termsOfUse).toLocaleLowerCase()}
			</Typography>
		</Typography>
	</div>
)
