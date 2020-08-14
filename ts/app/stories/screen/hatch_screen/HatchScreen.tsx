import * as React from "react";
import { Button, Content } from "native-base";
import styles from "app/stories/component/content/styles";
import { SimpleSvgIcon, ContentAuthor, ContentDetails, ContentDetailsList } from "components";
import ContentScreen, { IContentScreen } from "app/stories/screen/content_screen/ContentScreen";

interface IProps extends IContentScreen {
	hatchIt: () => void;
}

class HatchScreen extends ContentScreen<IProps> {

	public headerRightButtons() {
		const { hatchIt } = this.props;

		return (
			<Button onPress={hatchIt} transparent={true}>
				<SimpleSvgIcon style={[styles.color, styles.icon]} name='circular-hatch' />
			</Button>
		)
	}

	public fabButtons() {
		return;
	}

	public contentChildrens() {
		const { item } = this.props;

		return (
			<Content>
				<ContentDetails {...item}>
					<ContentDetailsList {...item} />
				</ContentDetails>
				<ContentAuthor {...item} />
			</Content>
		)
	}
}

export default HatchScreen;
