import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import CategoryScreen from '../screens/CategoryScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ShowMoreScreen from '../screens/ShowMoreScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

export default createStackNavigator(
    {
        Category: CategoryScreen,
        ShowMore: ShowMoreScreen,
        ProductDetail: ProductDetailScreen
    },
    config
);
