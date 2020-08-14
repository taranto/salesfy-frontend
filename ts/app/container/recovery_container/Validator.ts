import { I18n, KeyEnum } from "salesfy-shared";
import { email } from "app-core/utils/validation/RegexFormValidation";

const validate = (formProps) => {
	const errors:any = {};

	if (!formProps.emUser) {
		errors.emUser = I18n.t(KeyEnum.nmKeyRequired, {nmKey: I18n.t(KeyEnum.email)});
		// tslint:disable-next-line:max-line-length
		// RegExpConst.EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	} else {
		errors.emUser = email(formProps.emUser);
	}

	return errors;
}

export default validate;
