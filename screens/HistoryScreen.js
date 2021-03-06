import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import CardHistory from '../components/CardHistory'
import axios from "axios";

import { NavigationEvents } from 'react-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { REUSE } from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
export default class HistoryScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listHistory: [],
      isLoading: true,
    };

    this._menu = null;
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
    if (this.state.listHistory.length > 0) {
      const username = await AsyncStorage.getItem('username');
      await axios.delete(`http://${IP_API}/user/${username}/views`);
      this.setState({ listHistory: [], isShowTooltip: false });
    }
    this.hideMenu();
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

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    const { isLoading, listHistory } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this._referData()}
        />
        <View style={styles.wrapperTabBar}>
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
              style={styles.wrapperSearch}
            >
              <View style={styles.wrapperTxt}>
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
        <View style={styles.wrapperTitles}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#870f10' }}>
            Lịch sử xem hàng
          </Text>


          <Menu
            ref={this.setMenuRef}
            button={
              <TouchableOpacity
                onPress={this.showMenu}
                style={{ width: 50, alignItems: 'flex-end' }}
              >
                <FontAwesome
                  name='ellipsis-v'
                  size={20}
                  color='black'
                />
              </TouchableOpacity>
            }
          >
            <MenuItem onPress={this._onPressDeleteAll}>Xóa tất cả</MenuItem>
          </Menu>
        </View>
        <View style={styles.wrapperList}>
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
  wrapperTabBar: {
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
    justifyContent: "center",
    width: '10%'
  },
  wrapperSearch: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  wrapperTxt: {
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
  wrapperTitles: {
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
  wrapperList: {
    flex: 1,
  }
});



