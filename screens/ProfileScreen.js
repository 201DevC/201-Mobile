import React, { Component } from 'react';
import { View, AsyncStorage, Button, Image, StyleSheet, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {REUSE} from '../reuse/Reuse';

const color = '#2c3e50'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  onPressLogoutBtn = async () => {
    await AsyncStorage.removeItem('username');
    this.props.navigation.navigate('AuthLoading');
  }

  itemRecord = (iconName, text) => {
    return (
      <TouchableOpacity style={styles.itemRecord}>
        <Ionicons style={{ width: '10%' }} color={color} size={25} name={iconName} />
        <View style={styles.right}>
          <Text style={styles.txtRecord}>{text}</Text>
          <MaterialIcons color={color} size={25} name={"navigate-next"} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.warpperTabBar}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tài khoản</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.warpperInfoUser}>
            <View style={styles.warpperImg}>
              <Image resizeMode='contain' style={styles.imgUser} source={require('../assets/images/user.png')} />
            </View>
            <View style={styles.warpperTxt}>
              <Text style={{ fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', color:'#7f8c8d' }}>tri nha</Text>
              <Text style={{ fontSize: 15, marginTop:10, color:'#7f8c8d' }}>trinha@gmail.com</Text>
            </View>
          </View>
          <View style={styles.warpperBody}>
            <Text style={styles.title}>TÀI KHOẢN</Text>
            {this.itemRecord('md-list-box', 'Theo dõi đơn hàng')}
            {this.itemRecord('md-clipboard', 'Theo dõi khoản vay')}
            {this.itemRecord('ios-navigate', 'Thông tin nhận hàng')}
            <Text style={styles.title}>CHIA SẺ TÀI KHOẢN</Text>
            {this.itemRecord('logo-facebook', 'Facebook')}
            {this.itemRecord('logo-instagram', 'Instagram')}
            {this.itemRecord('logo-twitter', 'twitter')}
            <Text style={styles.title}>HỖ TRỢ</Text>
            {this.itemRecord('ios-key', 'Đổi mật khẩu')}
            {this.itemRecord('ios-help-circle', 'Trung tâm hỗ trợ')}
            {this.itemRecord('ios-document', 'Quy chế hoạt động')}
            {this.itemRecord('ios-information-circle', 'Về chúng tôi')}


          </View>
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={this.onPressLogoutBtn}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
ProfileScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 50,
  },
  warpperTabBar: {
    width: "100%",
    paddingTop: Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: REUSE.MAIN_COLOR,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warpperInfoUser: {
    flexDirection: 'row',
    padding: 10,
  },
  warpperImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden'
  },
  imgUser: {
    width: '100%',
    height: '100%'
  },
  warpperTxt: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  warpperBody: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  itemRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#95a5a6',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%'
  },
  txtRecord: {
    color: '#2c3e50',
    fontSize: 15,
    textAlign: "left",
    width: '90%',
  },
  title: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  btnLogout: {
    width: '100%',
    backgroundColor: '#e74c3c',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  }

});


