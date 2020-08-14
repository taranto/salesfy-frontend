export const urltoFile = (dataurl, filename) => {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

export const b64toBlob = (b64Data, contentType) => {
	contentType = contentType || '';
	const sliceSize = 512;

	const byteCharacters = atob(b64Data);
	const byteArrays:any = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers:any = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
}

export const urlBase64ToBlob = (ImageURL) => {
	if(ImageURL){
		// Split the base64 string in data and contentType
		const block = ImageURL.split(";");
		// Get the content type of the image
		const contentType = block[0].split(":")[1];// In this case "image/gif"
		// get the real base64 content of the file
		const realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
		// Convert it to a blob to upload
		return b64toBlob(realData, contentType);
	}
	return;
}

export const getNmDefaultChannelImage = () => {
	return "channel_default.png"
}

export const getNmDefaultContentImage = () => {
	return "content_default.png"
}
