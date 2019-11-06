import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthNavigator from './AuthNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const switchNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthNavigator,
    ChooseLikeProduct: ChooseLikeProductScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
