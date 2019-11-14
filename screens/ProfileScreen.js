import React, { Component } from 'react';
import { View, AsyncStorage, Button } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

export default class ProfileScreen extends Component {
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

  onPressLogoutBtn = async () => {
    await AsyncStorage.removeItem('username');
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.onPressLogoutBtn}
          title="Logout"
        />
      </View>
    );
  }
}

