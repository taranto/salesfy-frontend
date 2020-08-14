import { I18n, KeyEnum } from "salesfy-shared";
import { email, password, length } from "app-core/utils/validation/RegexFormValidation";

const validate = (formProps) => {
	const errors:any = {};

	if (!formProps.emUser) {
		errors.emUser = I18n.t(KeyEnum.nmKeyRequired, {nmKey: I18n.t(KeyEnum.email)});
	} else {
		errors.emUser = email(formProps.emUser);
	}

	if (!formProps.unKeyPassword) {
		errors.unKeyPassword = I18n.t(KeyEnum.nmKeyRequired, {nmKey: I18n.t(KeyEnum.password)});
	} else {
		if(password(formProps.unKeyPassword)){
			errors.unKeyPassword =
			length(formProps.unKeyPassword, I18n.t(KeyEnum.password), 8, 30) ||
			password(formProps.unKeyPassword);
		}
	}

	return errors;
}

export default validate;
