import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class MenuLevel1Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _goToMenuLv2 = () => {
    this.props.navigation.navigate('MenuLevel2');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go to Menu level 2!" onPress={this._goToMenuLv2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
