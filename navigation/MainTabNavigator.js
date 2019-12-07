import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ShoppingCardScreen from '../screens/ShoppingCardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { REUSE } from '../reuse/Reuse';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
  backgroundColor: 'black',
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Trang chủ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home'}
      focusedColor= {REUSE.TITTLE_COLOR}
    />
  ),
};

HomeStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Tìm kiếm',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'search'}
      focusedColor={REUSE.TITTLE_COLOR}
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
  tabBarLabel: 'Giỏ hàng',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'shopping-cart'}
      focusedColor={REUSE.TITTLE_COLOR}
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
  tabBarLabel: 'Lịch sử',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'history'}
      focusedColor={REUSE.TITTLE_COLOR}
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
  tabBarLabel: 'Tài khoản',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'user'}
      focusedColor={REUSE.TITTLE_COLOR}
    />
  ),
};

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  ShoppingStack,
  HistoryStack,
  ProfileStack,
},{
  tabBarOptions: {
    style: {
      backgroundColor:REUSE.TABBAR_COLOR,
    }
  }
});

tabNavigator.path = '';

export default tabNavigator;
