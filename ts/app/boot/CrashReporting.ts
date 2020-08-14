import { Client, Configuration } from 'bugsnag-react-native';
import { BUGSNAG_ID } from 'root/envVars';

const configuration = new Configuration(BUGSNAG_ID);
configuration.autoCaptureSessions = true;

const bugsnag = new Client(configuration);

export default bugsnag;
