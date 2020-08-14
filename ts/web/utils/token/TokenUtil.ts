export default class TokenUtil {

	public static isTokenExpired(_dsToken: string): boolean {
		return false
	}

	public static decodeToken(token: string): string | { [key: string]: any } | undefined | null {
		return token;
	}
}
