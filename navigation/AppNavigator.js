import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthNavigator from './AuthNavigator';
import ChooseLikeProductScreen from '../screens/ChooseLikeProductScreen';
import ProductDetailStack from './ProductDetailNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthNavigator,
    ChooseLikeProduct: ChooseLikeProductScreen,
    ProductDetailStack: ProductDetailStack,    
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
