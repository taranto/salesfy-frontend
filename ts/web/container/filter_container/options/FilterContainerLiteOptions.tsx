import { Translation } from 'app-core/utils/translate/Translation';

export const groupOptions: any = {
	sortOptions: [
		{ value: 'nmChannel', label: Translation.name },
		{ value: 'dhPublish', label: Translation.dhPublishInfo },
		{ value: 'keyCtContentState', label: Translation.state },
		{ value: 'dhLastConversion', label: Translation.lastView }
	],

	playbookAdvancedFilterTypes: [
		{ value: 'arIdGroup', label: Translation.groups, fieldOption: 'groups' },
		{ value: 'arIdPublisher', label: Translation.publishers, fieldOption: 'users' }
	],

	playbookFilterTypes: [
		{ value: 'dsSearch', label: Translation.all },
		{ value: 'nmChannel', label: Translation.name },
		{ value: 'dsChannel', label: Translation.description },
		{ value: 'nmGroup', label: Translation.group },
		{ value: 'nmPublisher', label: Translation.publisher }
	],

	lcFilterTypes: [
		{ value: 'dsSearch', label: Translation.all },
		{ value: 'nmContent', label: Translation.name },
		{ value: 'dsContent', label: Translation.description },
		{ value: 'nmPublisher', label: Translation.publisher }
	]
};
