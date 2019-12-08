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
          <Image style={{width:300,height:270}}
            // source={require("../assets/images/emoji.png")}
            source={{uri: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/p960x960/55944983_802426570138250_9072073022055120896_o.jpg?_nc_cat=102&_nc_ohc=ZCYCcKCthx0AQnQXO-XEAnBgr7HgbvrK0V6KXH4HQlJd5hUMQVCCUG4yQ&_nc_ht=scontent.fsgn1-1.fna&oh=178fb1dac7a956981d026c238c9ad8dd&oe=5E757804'}}
            resizeMode="stretch"
          />
          <Text>
            Ứng dụng đang bảo trì ...
          </Text>
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
