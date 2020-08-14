import React, { useState } from 'react';
import { ContentWizard } from 'web/stories/component/content_list/ContentWizard';
import { useDispatch } from 'react-redux';
import { StringUtil } from 'salesfy-shared';
import { addContentData, getContentList } from 'app-core/redux_store/content/Actions';
import Alert from 'native/Alert';
import { Translation } from 'app-core/utils/translate/Translation';
import { bulkIt } from 'app-core/utils/communication/Communication';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { useSelector } from 'react-redux';

const defaultErrors: string[] = [];

export const ContentWizardContainer = ({ location }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [links, setLinks] = useState('');
	const [errors, setErrors] = useState(defaultErrors);
	const state1 = useSelector(state => state);

	const prepareLinks = async () => {
		setLoading(true);
		const arLink = StringUtil.csLkCleaner(links).split(',')
		if (!arLink || arLink.length === 0 || (arLink.length === 1 && arLink[0]==="")) {
			Alert.error(Translation.emptyLinkArea)
			setLoading(false);
			setLinks('');
			return
		}
		let arIdChannel
		if (location.state && location.state.idChannel) {
			arIdChannel = [location.state.idChannel]
		}
		let arContent = []
		const arJoContentToAdd = arLink.map((link) => ({ lkPreview: link, idCtContent:1, isPlaybook:true, arIdChannel }))
		const arJoBulk = bulkIt(arJoContentToAdd)
		try {
			const mtAddContentData = await addContentData(arJoBulk)
			arContent = await dispatch(mtAddContentData)
		} catch (e) {
			setErrors([e])
			Alert.error(e)
		}

		if (arContent.length > 0) {
			const activeOptions = { ...state1.contentList.options, ...state1.contentList.options.filter}
			const mtGet = getContentList(LIST_LIMIT_DEFAULT, 0, activeOptions, true, true)
			await dispatch(mtGet)
			Alert.success(Translation.contentAddSuccesful)
		}
		setLoading(false);
		setLinks('');
	}

	return (
		<ContentWizard
			prepareLinks={prepareLinks}
			loading={loading}
			setLinks={setLinks}
			links={links}
			errors={errors}
		/>
	)
}
