const cardWidth = () => 60;
const imageHeight = () => cardWidth();
const platform = {
	categoryText: "#7f7f7f",
	filterColor: "#f0ad4e",
	headerInverseText: "#323232",
}

const styles: any = {
	flatList: {
		height: imageHeight() + 35
	},
	card: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		padding: 0,
		margin: 0,
		borderWidth: 2,
		borderColor: "transparent",
		borderStyle: "solid",
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		elevation: 0,
		boxShadow: "none"
	},
	cardImage: {
		alignSelf: "center",
		width: cardWidth() - 8,
		height: imageHeight() - 8,
		borderRadius: 100,
		overflow: "hidden",
		backgroundColor: "transparent",
		border: '1px solid #ebebeb',
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	cardSelected: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		padding: 0,
		margin: 0,
		borderWidth: 2,
		borderColor: platform.filterColor,
		borderRadius: 100,
		borderStyle: "solid",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		elevation: 0,
		boxShadow: "none"
	},
	cardPublish: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		padding: 0,
		margin: 0,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		elevation: 0,
		boxShadow: "none"
	},
	cardImageView: {
		width: cardWidth() + 35,
		height: imageHeight() + 35,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "column"
	},
	tagStorie: {
		marginTop: 4,
		color: "#670000",
		fontSize: 11,
		textAlign: "center"
	},
	touchableHighlight: {
		borderRadius: 100,
		backgroundColor: "transparent"
	},
	headerList: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 20,
		marginBottom: 20
	},
	headerMessage: {
		fontSize: 28,
		color: platform.headerInverseText
	},
	iconAdd: {
		color: "white",
		position: "absolute",
		right: 10,
		bottom: 40,
		margin: 0,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 100,
		width: 25,
		height: 25,
		backgroundColor: "#670000",
		fontSize: 20
	},
	publishImage: {
		width: 30,
		height: 30
	}
};
export default styles;
