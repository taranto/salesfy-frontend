import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;

export default {
	platformStyle,
	platform,
	// AndroidRipple
	androidRipple: true,
	androidRippleColor: "rgba(256, 256, 256, 0.3)",
	androidRippleColorDark: "rgba(0, 0, 0, 0.15)",

	// Badge
	badgeBg: "#ED1727",
	badgeColor: "#fff",
	// New Variable
	badgePadding: platform === "ios" ? 3 : 0,

	// btnFontFamily: platform === "ios" ? "System" : "Roboto_medium",
	// Button
	btnFontFamily: platform === "ios" ? "System" : "Lato Light",
	btnDisabledBg: "#b5b5b5",
	btnDisabledClr: "#f1f1f1",

	// CheckBox
	CheckboxRadius: platform === "ios" ? 13 : 0,
	CheckboxBorderWidth: platform === "ios" ? 1 : 2,
	CheckboxPaddingLeft: platform === "ios" ? 4 : 2,
	CheckboxPaddingBottom: platform === "ios" ? 0 : 5,
	CheckboxIconSize: platform === "ios" ? 21 : 14,
	CheckboxIconMarginTop: platform === "ios" ? undefined : 1,
	CheckboxFontSize: platform === "ios" ? 23 / 0.9 : 18,
	DefaultFontSize: 17,
	checkboxBgColor: "#039BE5",
	checkboxSize: 20,
	checkboxTickColor: "#fff",

	// Segment
	segmentBackgroundColor: platform === "ios" ? "#F8F8F8" : "#670000",
	segmentActiveBackgroundColor: platform === "ios" ? "#595a5a" : "#fff",
	segmentTextColor: platform === "ios" ? "#595a5a" : "#fff",
	segmentActiveTextColor: platform === "ios" ? "#fff" : "#670000",
	segmentBorderColor: platform === "ios" ? "#595a5a" : "#fff",
	segmentBorderColorMain: platform === "ios" ? "#a7a6ab" : "#670000",

	// New Variable
	get defaultTextColor() {
		return this.textColor;
	},

	get btnPrimaryBg() {
		return this.brandPrimary;
	},
	get btnPrimaryColor() {
		return this.inverseTextColor;
	},
	get btnInfoBg() {
		return this.brandInfo;
	},
	get btnInfoColor() {
		return this.inverseTextColor;
	},
	get btnSuccessBg() {
		return this.brandSuccess;
	},
	get btnSuccessColor() {
		return this.inverseTextColor;
	},
	get btnDangerBg() {
		return this.brandDanger;
	},
	get btnDangerColor() {
		return this.inverseTextColor;
	},
	get btnWarningBg() {
		return this.brandWarning;
	},
	get btnWarningColor() {
		return this.inverseTextColor;
	},
	get btnTextSize() {
		return platform === "ios" ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
	},
	get btnTextSizeLarge() {
		return this.fontSizeBase * 1.5;
	},
	get btnTextSizeSmall() {
		return this.fontSizeBase * 0.8;
	},
	get borderRadiusLarge() {
		return this.fontSizeBase * 3.8;
	},

	buttonPadding: 6,

	get iconSizeLarge() {
		return this.iconFontSize * 1.5;
	},
	get iconSizeSmall() {
		return this.iconFontSize * 0.6;
	},

	// Card
	cardDefaultBg: "#fff",

	// Color
	brandPrimary: "#670000",
	brandInfo: "#62B1F6",
	brandSuccess: "#5cb85c",
	brandDanger: "#d9534f",
	brandWarning: "#f0ad4e",
	brandSidebar: "#252932",

	purpleBg: "#e02b20",

	activeFavorite: "#e02b20",
	activeLike: "#670000",

	filterColor: "#f0ad4e",

	// Text
	inverseText: "white",
	categoryText: "#7f7f7f",
	headerInverseText: "#323232",

	// Font
	fontFamily: platform === "ios" ? "System" : "Lato Light",
	fontSizeBase: 15,

	get fontSizeH1() {
		return this.fontSizeBase * 1.8;
	},
	get fontSizeH2() {
		return this.fontSizeBase * 1.6;
	},
	get fontSizeH3() {
		return this.fontSizeBase * 1.4;
	},

	// Footer
	footerHeight: 55,
	footerDefaultBg: "#F8F8F8",

	// FooterTab
	tabBarTextColor: "#6b6b6b",
	tabBarTextSize: platform === "ios" ? 14 : 11,
	activeTab: "#595a5a",
	sTabBarActiveTextColor: "#670000",
	tabBarActiveTextColor: "#670000",
	tabActiveBgColor: "#F8F8F8",

	// Tab
	tabDefaultBg: platform === "ios" ? "#F8F8F8" : "#670000",
	topTabBarTextColor: platform === "ios" ? "#6b6b6b" : "#b3c7f9",
	topTabBarActiveTextColor: platform === "ios" ? "#595a5a" : "#fff",
	topTabActiveBgColor: platform === "ios" ? "#cde1f9" : undefined,
	topTabBarBorderColor: platform === "ios" ? "#a7a6ab" : "#fff",
	topTabBarActiveBorderColor: platform === "ios" ? "#595a5a" : "#fff",

	// Header
	toolbarBtnColor: "#670000",
	toolbarDefaultBg: "#670000",
	toolbarHeight: 56, // platform === "ios" ? 71 : 
	toolbarIconSize: 22, // platform === "ios" ? 20 : 
	toolbarSearchIconSize: 23, // platform === "ios" ? 20 : 
	toolbarInputColor: "#670000",
	searchBarHeight: platform === "ios" ? 30 : 40,
	toolbarInverseBg: "#222",
	toolbarTextColor: "#670000",
	toolbarDefaultBorder: "#1c4fce",
	iosStatusbar: platform === "ios" ? "dark-content" : "light-content",
	get statusBarColor() {
		return color(this.toolbarDefaultBg)
			.darken(0.2)
			.hex();
	},

	// Icon
	iconFamily: "Ionicons",
	iconFontSize: 28,
	iconMargin: 7,
	iconHeaderSize: 28,

	// InputGroup
	inputFontSize: 17,
	inputBorderColor: "#D9D5DC",
	inputSuccessBorderColor: "#2b8339",
	inputErrorBorderColor: "white", // #ed2f2f

	get inputColor() {
		return this.textColor;
	},
	get inputColorPlaceholder() {
		return "#575757";
	},

	inputGroupMarginBottom: 10,
	inputHeightBase: 50,
	inputPaddingLeft: 5,

	get inputPaddingLeftIcon() {
		return this.inputPaddingLeft * 8;
	},

	// Line Height
	btnLineHeight: 19,
	lineHeightH1: 32,
	lineHeightH2: 27,
	lineHeightH3: 22,
	iconLineHeight: platform === "ios" ? 37 : 30,
	lineHeight: platform === "ios" ? 20 : 24,

	// List
	listBorderColor: "#c9c9c9",
	listDividerBg: "#f4f4f4",
	listItemHeight: 45,
	listBtnUnderlayColor: "#DDD",

	// Card
	cardBorderColor: "#ccc",

	// Changed Variable
	listItemPadding: platform === "ios" ? 10 : 12,

	listNoteColor: "#595a5a",
	listNoteSize: 13,

	// Progress Bar
	defaultProgressColor: "#E4202D",
	inverseProgressColor: "#1A191B",

	// Radio Button
	radioBtnSize: platform === "ios" ? 25 : 23,
	radioSelectedColorAndroid: "#670000",

	// New Variable
	radioBtnLineHeight: platform === "ios" ? 29 : 24,

	radioColor: "#7e7e7e",

	get radioSelectedColor() {
		return color(this.radioColor)
			.darken(0.2)
			.hex();
	},

	// Spinner
	defaultSpinnerColor: "#670000",
	inverseSpinnerColor: "white",

	// Tabs
	tabBgColor: "#F8F8F8",
	tabFontSize: 15,
	tabTextColor: "#222222",

	// Text
	textColor: "#000",
	inverseTextColor: "#fff",
	noteFontSize: 14,

	// Title
	titleFontfamily: platform === "ios" ? "System" : "Lato Light",
	titleFontSize: platform === "ios" ? 17 : 19,
	subTitleFontSize: platform === "ios" ? 12 : 14,
	subtitleColor: platform === "ios" ? "#8e8e93" : "#FFF",

	// New Variable
	titleFontColor: platform === "ios" ? "#000" : "#FFF",

	// Other
	borderRadiusBase: platform === "ios" ? 5 : 2,
	borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	contentPadding: 10,

	get darkenHeader() {
		return color(this.tabBgColor)
			.darken(0.03)
			.hex();
	},

	dropdownBg: "#000",
	dropdownLinkColor: "#414142",
	inputLineHeight: 24,
	jumbotronBg: "#C9C9CE",
	jumbotronPadding: 30,
	deviceWidth,
	deviceHeight,

	// New Variable
	inputGroupRoundedBorderRadius: 30,
};