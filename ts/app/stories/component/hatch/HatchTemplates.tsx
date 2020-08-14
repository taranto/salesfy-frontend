import React from 'react';
import { Form, View, Text } from 'native-base';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from 'app/stories/component/hatch/styles';
import { FastImageOriginalSize } from 'app/stories/component/hatch/FastImageOriginalSize';
import { ListHeaderTitle } from 'app/stories/component/list/List';
import { Field } from 'redux-form';
import { KeyEnum, I18n } from 'salesfy-shared';

const typesImport = [
	{ ctTemplate: 1, piTemplate: require('../../../../../assets/templates/template1.png') },
	{ ctTemplate: 3, piTemplate: require('../../../../../assets/templates/template3.png') },
	{ ctTemplate: 7, piTemplate: require('../../../../../assets/templates/template7.png') },
	{ ctTemplate: 8, piTemplate: require('../../../../../assets/templates/template8.png') },
]

interface IProps {
	ctTemplate: any
}
export class HatchTemplates extends React.Component<IProps> {
	constructor(props) {
		super(props);
	}

	public render() {

		return (
			<Form style={styles.form}>
				<ListHeaderTitle title={I18n.t(KeyEnum.chooseTemplateContent)} />
				<Field
					name="ctTemplate"
					placeholderTextColor="#6d6d6d"
					component={TemplateList}
					ctTemplate={this.props.ctTemplate}
				/>
			</Form>
		)
	}
}

const TemplateList = (props) => {
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			data={typesImport}
			horizontal={true}
			extraData={props}
			keyExtractor={(item) => item.ctTemplate.toString()}
			renderItem={data => <ImportType item={data.item} ctTemplate={props.ctTemplate} input={props.input} />}
		/>
	)
}

const ImportType = ({ item, ctTemplate, input }) => {
	return (
		// tslint:disable-next-line:jsx-no-lambda 
		<TouchableWithoutFeedback onPress={() => input.onChange(item.ctTemplate)}>
			<View>
				<FastImageOriginalSize scale={4} key={item.ctTemplate} source={item.piTemplate} style={styles.cardImage} />
				{item.ctTemplate === ctTemplate ? <View style={styles.selected}><Text style={styles.selectedText}>Selecionado</Text></View> : <View style={styles.selectedDummy} />}
			</View>
		</TouchableWithoutFeedback>
	)
}
