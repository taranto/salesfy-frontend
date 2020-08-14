import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { I18n, KeyEnum } from 'salesfy-shared';
import { Text } from 'native-base';
import styles from './styles';
import { Translation } from 'app-core/utils/translate/Translation';

interface IProps {
	items, selectText, customChipsRenderer, uniqueKey, displayKey, input?
}
interface IState {
	selectedItems
}
class ComboBoxMulti extends React.Component<IProps, IState> {
	constructor(props) {
		super(props)

		this.state = {
			selectedItems: [],
		};

		this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);
	}

	public onSelectedItemsChange = (selectedItems) => {
		if(this.props.input){
			this.props.input.onChange(selectedItems);
		}
		this.setState({ selectedItems });
	};

	public render() {
		const { items, selectText, customChipsRenderer, uniqueKey, displayKey } = this.props;

		return (
			<SectionedMultiSelect
				items={items}
				uniqueKey={uniqueKey}
				displayKey={displayKey}
				customChipsRenderer={customChipsRenderer}
				selectText={selectText}
				showDropDowns={true}
				readOnlyHeadings={false}
				onSelectedItemsChange={this.onSelectedItemsChange}
				selectedItems={this.state.selectedItems}
				showChips={true}
				selectedText={I18n.t(KeyEnum.selected_plural)}
				confirmText={I18n.t(KeyEnum.confirm)}
				searchPlaceholderText={I18n.t(KeyEnum.filter)}
				noResultsComponent={<Text style={styles.textCenter}>{Translation.emptyItems}</Text>}
				noItemsComponent={<Text style={styles.textCenter}>{Translation.emptyItems}</Text>}
			/>
		)
	}
}

export default ComboBoxMulti;
