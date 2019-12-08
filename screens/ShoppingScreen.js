import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import { REUSE } from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
export default class ShoppingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.warpperTabBar}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: REUSE.TITTLE_COLOR }}>Giỏ hàng</Text>
        </View>
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:250,height:250}}
            source={require("../assets/images/emoji.png")}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }
}

ShoppingScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: REUSE.MAIN_COLOR
  },
  warpperTabBar: {
    width: "100%",
    paddingTop: Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: REUSE.TABBAR_COLOR,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
