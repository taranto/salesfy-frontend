import { WEB_SYSTEM_NAME, WEB_SYSTEM_VERSION } from 'root/envVars';
class DeviceInfo {
	public static getSystemName(): string {
		return WEB_SYSTEM_NAME;
	}
	public static getVersion(): string {
		return WEB_SYSTEM_VERSION;
	}
}

export default DeviceInfo;
