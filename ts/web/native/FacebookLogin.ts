class AccessToken {
	public static async getCurrentAccessToken():Promise<any> {
		return new Promise(resolve => {
			resolve({});
		})
	}
}

class LoginManager {
	public static async logOut():Promise<any> {
		return new Promise(resolve => {
			resolve({});
		})
	}
}

export { AccessToken, LoginManager };
