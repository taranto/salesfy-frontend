import * as React from 'react';
import { Item, Icon, Input, View, Button, Text, CheckBox, Textarea, Label, Radio } from "native-base";
import styles from "./styles";
import platform from 'app/theme/variables/platform';
import { I18n, KeyEnum } from 'salesfy-shared';
import { Platform } from 'react-native';

// tslint:disable-next-line:variable-name
export const FormInput = (
	{ icon, label, autoCapitalize, secureTextEntry, onCancelPress, input, meta: { touched, error } }
) => {
	return (
		<View>
			<Item error={error && touched} style={styles.item}>
				<Icon active={true} name={icon} onPress={onCancelPress} />
				<Input
					placeholder={label}
					placeholderTextColor={"white"}
					secureTextEntry={secureTextEntry}
					autoCapitalize={autoCapitalize}
					style={styles.input}
					{...input}
				/>
			</Item>
			{(error && touched) && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	);
}

// tslint:disable-next-line:variable-name
export const SimpleFormInput = (
	{ label, autoCapitalize, secureTextEntry, placeholderTextColor, input, style, onSubmitEditing, meta: { touched, error } }
) => {
	return (
		<Item error={error && touched} style={style}>
			<Input
				placeholder={label}
				placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
				onSubmitEditing={onSubmitEditing}
				{...input}
			/>
		</Item>
	);
}

export const SearchFormInput = (
	{ label, autoCapitalize, secureTextEntry, placeholderTextColor, input, style, onSubmitEditing, meta: { touched, error } }
) => {
	return (
		<Item error={error && touched} style={style}>
			<Input
				placeholder={label}
				placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
				onSubmitEditing={onSubmitEditing}
				style={{ color: platform.toolbarBtnColor }}
				{...input}
			/>
		</Item>
	);
}

export const SimpleFormWithErrorInput = (
	{ label, autoCapitalize, secureTextEntry, placeholderTextColor, input, style, onSubmitEditing, meta: { touched, error } }
) => {
	const errorStyle = (error && touched) ? styles.errorField : {};
	return (
		<Item error={error && touched} style={[...style, errorStyle]}>
			<Input
				placeholder={label}
				placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
				onSubmitEditing={onSubmitEditing}
				{...input}
			/>
		</Item>
	);
}

export const SimpleFormTextErrorInput = (
	{ label, autoCapitalize, secureTextEntry, placeholderTextColor, input, style, onSubmitEditing, meta: { touched, error } }
) => {
	return (
		<>
			<Item error={error && touched} style={style}>
				<Input
					placeholder={label}
					placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
					secureTextEntry={secureTextEntry}
					autoCapitalize={autoCapitalize}
					onSubmitEditing={onSubmitEditing}
					{...input}
				/>
			</Item>
			{(error && touched) && <Text style={styles.errorText}>{error}</Text>}
		</>
	);
}

// tslint:disable-next-line:variable-name
export const AreaInput = (
	{ input, style, placeholderTextColor, label, onSubmitEditing }
) => {
	return (
		<Textarea
			rowSpan={10}
			onSubmitEditing={onSubmitEditing}
			placeholder={label}
			placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
			style={style}
			{...input}
		/>
	);
}

// tslint:disable-next-line:variable-name
export const RadioButtonInput = (
	{ input, onSubmitEditing, label, meta: { touched, error } }
) => {
	return (
		<Item error={error && touched} style={styles.radioButton}>
			<Radio
				type="radio"
				label={label}
				onChange={onSubmitEditing}
				{...input}
			/>
			<Label style={styles.radioButtonLabel}>{label}</Label>
		</Item>
	);
}

interface IFormButtons {
	submitText: string, submitPress: () => void,
	linkText: string, linkPress: () => void,
	subLinkText?: string, subLinkPress: () => void,
	errorMessage: string
}

export const FormTitle = ({ title }) => {
	return (<Text style={styles.formTitle}>{title}</Text>)
}

// tslint:disable-next-line:variable-name
export const FormButtons =
	({ errorMessage, submitText, linkText, linkPress, submitPress, subLinkText, subLinkPress }: IFormButtons) => {

		const subLinkButton = (Platform.OS === "android" && subLinkText) && (
			<Button primary={true} small={true} transparent={true} style={styles.linkButton} onPress={subLinkPress} >
				<Text style={styles.linkButtonColor}>{subLinkText}</Text>
			</Button >
		)

		return (
			<View style={styles.viewButtons}>
				<Text style={styles.submitErrorMessage}>{errorMessage}</Text>
				<Button rounded={true} bordered={true} style={styles.submitButton} color={"white"} onPress={submitPress}>
					<Text style={styles.submitText}>{submitText}</Text>
				</Button>
				<Button primary={true} small={true} transparent={true} style={styles.linkButton} onPress={linkPress}>
					<Text style={styles.linkButtonColor}>{linkText}</Text>
				</Button>
				{subLinkButton}
			</View>
		)
	}
// tslint:disable-next-line:variable-name
export const AcceptTerms = ({ checked, changeAcceptTerms, goToTermsOfUse }) => (
	<View style={styles.containerCheckbox}>
		<CheckBox style={styles.checkbox} checked={checked} color={checked ? platform.purpleBg : "white"} onPress={changeAcceptTerms} />
		<Text style={styles.acceptText}>{`${I18n.t(KeyEnum.iAccept, { context: "the" })} `}
			<Text onPress={goToTermsOfUse} style={[styles.underlineText, styles.acceptText]}>{I18n.t(KeyEnum.termsOfUse).toLocaleLowerCase()}</Text>
		</Text>
	</View>
)
