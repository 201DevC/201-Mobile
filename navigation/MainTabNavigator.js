import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ShoppingCardScreen from '../screens/ShoppingCardScreen';
import GiftScreen from '../screens/GiftScreen';
import ProfileScreen from '../screens/ProfileScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home'}
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
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'search'}
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
  tabBarLabel: "Cart",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'shopping-cart'}
    />
  ),
};

ShoppingStack.path = '';

const GiftStack = createStackNavigator(
  {
    Gift: GiftScreen,
  },
  config
);

GiftStack.navigationOptions = {
  tabBarLabel: "Gift",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'gift'}
    />
  ),
};

GiftStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'user'}
    />
  ),
};

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  ShoppingStack,
  GiftStack,
  ProfileStack,

});

tabNavigator.path = '';

export default tabNavigator;
