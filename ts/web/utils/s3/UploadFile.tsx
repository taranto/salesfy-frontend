import { uploadFile } from 'react-s3';
import { S3_SECRET_KEY } from 'root/envVars';
import { S3_ACCESS_KEY } from 'root/envVars';
import { S3_BUCKET } from 'root/envVars';
import { S3_CONTENT_DIR } from 'root/envVars';
import { S3_REGION } from 'root/envVars';

const config = {
	dirName: S3_CONTENT_DIR,
	bucketName: S3_BUCKET,
	region: S3_REGION,
	accessKeyId: S3_ACCESS_KEY,
	secretAccessKey: S3_SECRET_KEY,
}

export const S3FileUpload = async (file) => {
	return uploadFile(file, config);
}
