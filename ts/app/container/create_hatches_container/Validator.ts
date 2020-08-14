import { I18n, KeyEnum, ValHN } from "salesfy-shared";

const validate = (joParam) => {
	const errors:any = {};

	if(!joParam.lkContent){
		errors['lkContent'] = I18n.t(KeyEnum.required);
	}

	if(!ValHN.valNmKey('lkContent', joParam.lkContent)){
		errors['lkContent'] = I18n.t(KeyEnum.valWeblink);
	}

	if(!joParam.nmContent){
		errors['nmContent'] = I18n.t(KeyEnum.required);
	}

	if(!joParam.ctContent){
		errors['ctContent'] = I18n.t(KeyEnum.required);
	}

	if(!joParam.idTemplate){
		errors['idTemplate'] = I18n.t(KeyEnum.required);
	}

	if(!joParam.piContent){
		errors['piContent'] = I18n.t(KeyEnum.required);
	}

	return errors;
}

export default validate;
