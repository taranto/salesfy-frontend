import { I18n, KeyEnum } from "salesfy-shared";

const validate = (joParam) => {
	const errors:any = {};

	if(!joParam.nmContent){
		errors['nmContent'] = I18n.t(KeyEnum.required);
	}

	if(!joParam.ctContent){
		errors['ctContent'] = I18n.t(KeyEnum.required);
	}

	if(!joParam.idTemplate){
		errors['idTemplate'] = I18n.t(KeyEnum.required);
	}

	return errors;
}

export default validate;
