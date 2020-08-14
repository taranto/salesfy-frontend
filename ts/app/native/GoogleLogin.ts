import { Platform } from "react-native";

let GoogleSignin;
if(Platform.OS === "ios"){
	GoogleSignin = require('./GoogleLogin.ios').GoogleSignin;
} else {
	GoogleSignin = require('./GoogleLogin.android').GoogleSignin;
}
export { GoogleSignin };
