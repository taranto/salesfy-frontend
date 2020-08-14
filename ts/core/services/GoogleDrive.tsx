import { GOOGLE_LOGIN_WEB_CLIENT_ID } from "root/envVars";

class GoogleDrive {

	public static async signIn() {
		const gapi = window['gapi'] || [];

		return gapi.auth2.getAuthInstance().signIn();
	}

	public static async getFiles(joToken, idFolder?: string) {
		return fetch(`https://www.googleapis.com/drive/v3/files/${GoogleDrive.getQuery(idFolder)}`,
			{
				headers: {
					'Authorization': `Bearer ${joToken.accessToken}`,
					'Content-Type': 'application/json'
				},
				method: "GET"
			})
			.then(response => response.json())
			.catch((error) => console.log(error));
	}

	private static getQuery(idFolder?: string) {
		const folderFilter = idFolder ? `and '${idFolder}' in parents` : `and 'root' in parents`;
		return `
			?q=trashed=false and 'me' in owners ${folderFilter}
			&key=${GOOGLE_LOGIN_WEB_CLIENT_ID}
			&fields=kind,files(id, name, mimeType, webViewLink, iconLink, hasThumbnail, thumbnailLink, parents)
		`
	}
}

export default GoogleDrive;
