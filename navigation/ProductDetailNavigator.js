import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

export default createStackNavigator(
    {
        ProductDetail: ProductDetailScreen,
    },
    config
);
