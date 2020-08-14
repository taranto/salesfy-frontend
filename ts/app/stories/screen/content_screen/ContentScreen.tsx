import * as React from "react";
import { Container } from "native-base";
import styles from "./styles";
import { ContentHeader, PageCircularLoader } from "components";
import { ILoading } from "app-core/utils/interfaces";

export interface IContentScreen extends ILoading {
	item: any;
	onFavorite: () => void;
	onBack: () => void;
	isLoadingWebview?: boolean;
}

abstract class ContentScreen<T extends IContentScreen, S={}> extends React.Component<T, S> {

	public render() {
		const { item, isLoading, onBack, isLoadingWebview } = this.props;

		return isLoading ? <PageCircularLoader /> :
			(
				<Container style={styles.container}>
					<ContentHeader isLoadingWebview={isLoadingWebview} onBack={onBack} {...item}>
						{this.headerRightButtons()}
					</ContentHeader>
					{this.contentChildrens()}
					{this.fabButtons()}
				</Container>
			);
	}

	public abstract headerRightButtons();
	public abstract contentChildrens();
	public abstract fabButtons();
}

export default ContentScreen;
