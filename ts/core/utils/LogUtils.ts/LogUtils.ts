
import { IS_DEVELOPMENT } from 'root/envVars';

class LogUtils {
	public static print(...obj) {
		if(IS_DEVELOPMENT) {
			console.log(...obj);
		}
	}
}

export default LogUtils;
