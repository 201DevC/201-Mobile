import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { PRODUCT } from '../data/product'
import CardHistory from '../components/CardHistory'
import axios from "axios";

import { FlatList } from 'react-native-gesture-handler';

const IP_API = "35.240.241.27:8080";
export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHistory: [],
      isLoading: true
    };
  }


  async componentDidMount() {
    const dataFlashSale = await axios.get(`http://${IP_API}/flash?offset=0`);
    return this.setState({
      listHistory: dataFlashSale.data.data.content,
      isLoading: false
    })
  }

  onPressSearch = () => {
    this.props.navigation.navigate('Search');
}

  render() {
    const { isLoading } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.warpperTabBar}>
          <View style={styles.tabBar}>
            <View style={styles.back}>
              <TouchableOpacity>
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
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Lịch sử xem hàng
          </Text>
          <FontAwesome
            name='ellipsis-v'
            size={20}
            color='grey'
          />
        </View>
        <View style={styles.warpperList}>
          {
            isLoading ? <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <ActivityIndicator animating={isLoading} />
              <Text>Dữ liệu đang tải, xin vui lòng chờ...</Text>
            </View> :
              <FlatList
                data={this.state.listHistory}
                renderItem={({ item }) => <CardHistory
                  key={item.id}
                  data={item}
                />}
                keyExtractor={item => item.id}
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
    paddingTop: Constants.statusBarHeight + 60
  },
  warpperTabBar: {
    width: "100%",
    paddingTop: Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: "#ffdee3",
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
    borderBottomColor: '#bdc3c7'
  },
  warpperList: {
    flex: 1,

  }


});



