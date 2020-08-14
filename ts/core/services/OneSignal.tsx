// import { ONE_SIGNAL_ID } from "root/envVars";

class OneSignalService {
	public static async init() {
		const OneSignal = window['OneSignal'] || [];
		/*
		console.log(OneSignal);
		await OneSignal.push(() => {
			OneSignal.init({
				appId: ONE_SIGNAL_ID,
				allowLocalhostAsSecureOrigin: true,
				autoRegister: true
			});

			console.log("init");
		});
		*/
		OneSignal.isPushNotificationsEnabled((isEnabled) => {
			OneSignal.setSubscription(true);
			if (isEnabled) {
				console.log("Push notifications are enabled!");

			} else {
				console.log("Push notifications are not enabled yet.");
			}
		});

		OneSignal.getUserId().then(() => {
			// console.log("OneSignal User ID:", userId);
			// (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
		});
	}
}

export default OneSignalService;
