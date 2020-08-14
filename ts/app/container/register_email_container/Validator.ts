import { I18n, KeyEnum } from "salesfy-shared";
import { email } from "app-core/utils/validation/RegexFormValidation";

const validate = (formProps) => {
	const errors:any = {};

	if (!formProps.emUser) {
		errors.emUser = I18n.t(KeyEnum.nmKeyRequired, {nmKey: I18n.t(KeyEnum.email)});
	} else {
		errors.emUser = email(formProps.emUser);
	}

	return errors;
}

export default validate;
