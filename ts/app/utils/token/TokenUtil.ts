export default class TokenUtil {

	public static isTokenExpired(dsToken: string): boolean {
		return !dsToken
	}

	public static decodeToken(token: string): string | { [key: string]: any } | undefined | null {
		return token;
	}
}
