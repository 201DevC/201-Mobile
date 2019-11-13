import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ShoppingCardScreen from '../screens/ShoppingCardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MenuLevel1Screen from '../screens/MenuLevel1Screen';
import MenuLevel2Screen from '../screens/MenuLevel2Screen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    ProductDetail: ProductDetailScreen,
    MenuLevel2: MenuLevel2Screen,
  },
  config,
);

HomeStack.path = '';

const HomeDrawerNavigator = createDrawerNavigator(
  {
    Initial: HomeStack
  },
  {
    contentComponent: MenuLevel1Screen,
  },
  {
    mode: 'modal',
    transparentCard: true,
    cardStyle: {backgroundColor: 'transparent'},
  }
);

HomeDrawerNavigator.navigationOptions = {
  tabBarLabel: "Trang chủ",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home'}
      focusedColor='#f1797a'
    />
  ),
};
HomeDrawerNavigator.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: "Tìm kiếm",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'search'}
      focusedColor='#f1797a'
    />
  ),
};

SearchStack.path = '';

const ShoppingStack = createStackNavigator(
  {
    ShoppingCard: ShoppingCardScreen,
  },
  config
);

ShoppingStack.navigationOptions = {
  tabBarLabel: "Giỏ hàng",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'shopping-cart'}
      focusedColor='#f1797a'
    />
  ),
};

ShoppingStack.path = '';

const HistoryStack = createStackNavigator(
  {
    History: HistoryScreen,
  },
  config
);

HistoryStack.navigationOptions = {
  tabBarLabel: "Lịch sử",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'history'}
      focusedColor='#f1797a'
    />
  ),
};

HistoryStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Tài khoản",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'user'}
      focusedColor='#f1797a'
    />
  ),
};

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeDrawerNavigator,
  SearchStack,
  ShoppingStack,
  HistoryStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
