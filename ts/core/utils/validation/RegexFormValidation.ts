import { RegExpConst, I18n, KeyEnum } from "salesfy-shared";

// tslint:disable-next-line:variable-name
const RegexFormValidation = (value: string, regex: RegExp, invalidMessage: string) =>
	value && regex.test(value) ? undefined : invalidMessage;

// tslint:disable-next-line:variable-name
const RegexinverseFormValidation = (value: string, regex: RegExp, invalidMessage: string) =>
	value && !regex.test(value) ? undefined : invalidMessage;

// tslint:disable-next-line:variable-name
const RegexLegthValidation = (value: string, min: number, max: number, invalidMessage: string) =>
	value && new RegExp(`^.{${min},${max}}$`).test(value) ? undefined : invalidMessage;

const required = value => (value ? undefined : I18n.t(KeyEnum.required));
const email = value => RegexFormValidation(value, RegExpConst.EMAIL, I18n.t(KeyEnum.email));
// tslint:disable-next-line:max-line-length
const login = value => RegexFormValidation(value, RegExpConst.LOGIN, I18n.t(KeyEnum.valEmail));
const password = value => RegexFormValidation(value, RegExpConst.PASSWORD, I18n.t(KeyEnum.incorrectPassword));

// tslint:disable-next-line:max-line-length
const lowercase = (value, nmKey) => RegexinverseFormValidation(value, new RegExp(`^.*([A-Z]).*$`), I18n.t(KeyEnum.nmKeyValFormatLowercase, {nmKey}));

// tslint:disable-next-line:max-line-length
const length = (value, nmKey, min, max) => RegexLegthValidation(value, min, max, I18n.t(KeyEnum.nmKeyValFormatLenght, {nmKey, min, max}))

export { required, email, login, password, length, lowercase };
export default RegexFormValidation;
