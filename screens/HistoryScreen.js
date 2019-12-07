import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import CardHistory from '../components/CardHistory'
import axios from "axios";

import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';

import { REUSE } from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHistory: [],
      isLoading: true,
      isShowTooltip: false,
    };
  }

  _getData = async () => {
    const username = await AsyncStorage.getItem('username');

    const dataHistory = await axios.get(`http://${IP_API}/user/${username}/views?offset=0`);
    const listHistory = dataHistory.data.data.content.filter(item => item !== null);
    return this.setState({
      listHistory,
      isLoading: false
    });
  }

  _referData = () => {
    this.setState({
      listHistory: [],
      isLoading: true
    });
    this._getData();
  }

  _onPressDeleteBtn = async (productId) => {
    const username = await AsyncStorage.getItem('username');
    await axios.delete(`http://${IP_API}/user/${username}/views/${productId}`);
    const listHistory = this.state.listHistory.filter(item => item.id !== productId);
    this.setState({ listHistory });
  }

  _onPressDeleteAll = async () => {
    const username = await AsyncStorage.getItem('username');
    await axios.delete(`http://${IP_API}/user/${username}/views`);
    this.setState({ listHistory: [], isShowTooltip: false });
  }

  onPressSearch = () => {
    this.props.navigation.navigate('Search');
  }

  _onPressBackButton = () => {
    this.props.navigation.navigate('Home');
  }

  _goToProductDetail = (id) => {
    this.props.navigation.navigate('ProductDetail', { id: id, screen: 'History' }); s
  }

  _onPressTootip = () => {
    const isShowTooltip = !this.state.isShowTooltip;
    this.setState({ isShowTooltip });
  }

  render() {
    const { isLoading, listHistory, isShowTooltip } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this._referData()}
        />
        <View style={styles.warpperTabBar}>
          <View style={styles.tabBar}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={this._onPressBackButton}
              >
                <FontAwesome size={20} name={"chevron-left"} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={this.onPressSearch}
              style={styles.warpperSearch}
            >
              <View style={styles.warpperTxt}>
                <Text style={styles.txtTimKiem}>Tìm kiếm trên </Text>
                <Text style={styles.txtSendo}>Sendo</Text>
              </View>
              <FontAwesome
                name='search'
                size={17}
                color='grey'
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.warpperTitles}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#870f10' }}>
            Lịch sử xem hàng
          </Text>

          {/* <TouchableOpacity
            style={{ width: '10%', alignItems: 'flex-end' }}
            onPress={this._onPressTootip}
          > */}
          {/* <Tooltip
              popover={
                <TouchableOpacity
                  onPress={this._onPressDeleteAll}
                >
                  <Text>Xóa tất cả</Text>
                </TouchableOpacity>
              }
              // toggleOnPress={isShowTooltip}
              withOverlay={false}
              backgroundColor='white'
              // onPress={this._onPressTootip}
              // containerStyle={{ width: 50, alignItems: 'flex-end' }}
            >
              <FontAwesome
                name='ellipsis-v'
                size={20}
                color='black'
              />
            </Tooltip> */}
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.warpperList}>
          {
            isLoading ? <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <ActivityIndicator animating={isLoading} />
              <Text>Dữ liệu đang tải, xin vui lòng chờ...</Text>
            </View> :
              <FlatList
                data={listHistory}
                renderItem={({ item }) => <CardHistory
                  _onPress={() => this._goToProductDetail(item.id)}
                  _onPressDeleteBtn={() => this._onPressDeleteBtn(item.id)}
                  key={item.id}
                  data={item}
                />}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
          }
        </View>
      </View >
    );
  }
}

HistoryScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 60,
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
    borderBottomRightRadius: 5
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
    borderRadius: 5,
    height: 40,
  },
  back: {
    justifyContent: "center"
  },
  warpperSearch: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 15
  },
  warpperTxt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: '90%'
  },
  txtTimKiem: {
    color: 'grey',
    fontSize: 17
  },
  txtSendo: {
    fontWeight: "bold",
    color: 'red',
    fontSize: 17
  },
  warpperTitles: {
    flexDirection: "row",
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    marginBottom: 5,
    backgroundColor: '#fff'
  },
  warpperList: {
    flex: 1,

  }
});



