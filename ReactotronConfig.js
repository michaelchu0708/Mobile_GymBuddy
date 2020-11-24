import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

let packagerHostname = "localhost";
if (__DEV__) {
 const scriptURL = NativeModules.SourceCode.scriptURL;
 packagerHostname = scriptURL.split("://")[1].split(":")[0];
}
const reactotron = Reactotron.configure({
    name: "Integration_demo",
    host: packagerHostname
  }).useReactNative({asyncStorage: {ignore: []}}).use(reactotronRedux()).connect();

export default reactotron;