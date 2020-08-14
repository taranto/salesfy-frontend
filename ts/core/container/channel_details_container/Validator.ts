import { I18n, KeyEnum } from "salesfy-shared";

const validate = (joParam) => {
	const errors:any = {};

	if(!joParam.piChannel){
		errors['piChannel'] = I18n.t(KeyEnum.required);
		errors['idCtChannelView'] = I18n.t(KeyEnum.required);
	}

	if(!joParam.nmChannel){
		errors['nmChannel'] = I18n.t(KeyEnum.required);
	}

	return errors;
}

export default validate;
