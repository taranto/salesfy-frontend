jest.mock("authentication", () => ({
	initAuthentication: jest.fn(),
	authenticate: jest.fn(),
	resetAuthentication: jest.fn(),
	genericAuthentication: jest.fn()  
}));

jest.mock('react-native', () => ({
	Dimensions: {
		get: jest.fn().mockReturnValue({width: 100, height:100})
	},
	Platform: {
		OS: jest.fn().mockReturnValue("Android")
	},
	PixelRatio: {
		getPixelSizeForLayoutSize: jest.fn().mockReturnValue(1)
	},
}), { virtual: true })

jest.mock('react-native-device-info', () => {
	return {
		getVersion: jest.fn().mockReturnValue("1.1.1"),
		getSystemName: jest.fn().mockReturnValue("Android"),
		OS: jest.fn()
	};
});

jest.mock('bugsnag-react-native', () => ({
	Configuration: jest.fn(),
	Client: jest.fn().mockImplementation(() => {
		return {
			notify: jest.fn()
		};
	})
}))

jest.mock('react-native-sensitive-info', () => ({
	RNSensitiveInfo: jest.fn()
}))

jest.mock("app/stories/component/toast/Toast", () => ({
	fireErrorMessage: jest.fn()
}));