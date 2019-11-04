import React, { Component } from 'react';
import { View, Text } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

export default class GiftScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
    tabBarLabel: "Card",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={'md-information-circle'}
      />
    ),
  }

  render() {
    return (
      <View>
        <Text> GiftScreen </Text>
      </View>
    );
  }
}

GiftScreen.navigationOptions = {
  header: null,
};
