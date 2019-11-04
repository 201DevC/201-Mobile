import LoginScreen from '../screens/LoginScreen';
import { createSwitchNavigator } from 'react-navigation';
import ChooseLikeProductScreen from '../screens/ChooseLikeProductScreen';
import { Platform } from 'react-native';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

export default createSwitchNavigator(
    {
        Login: LoginScreen,
        ChooseLikeProduce: ChooseLikeProductScreen,
    },
    {
        initialRouteName: 'Login',
    },
    config
);
