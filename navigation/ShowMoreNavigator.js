import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import ShowMoreScreen from '../screens/ShowMoreScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

export default createStackNavigator(
    {
        ShowMore: ShowMoreScreen,
    },
    config
);
