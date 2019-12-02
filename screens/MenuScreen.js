import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import Categorylv1 from '../components/CategoryLv1';
import axios from "axios";


const IP_API = "hellodoctor.tech:8080";
export default class MenuLevel1Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listcategoryLv1: [],
    };
  }

  _goToMenuLv2 = () => {
    this.props.navigation.navigate('MenuLevel2');
  }
  _getDataCategoryLv1 = async () => {
    const data = await axios.get(`http://${IP_API}/category/lv1?page=1`);
    return this.setState({
      listcategoryLv1: data.data.data.content,
    })
  }
  async componentDidMount() {
    await this._getDataCategoryLv1()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:30, fontWeight: "bold" }}>Danh mục</Text>
        <ScrollView style={{ flex: 1 }} horizontal={false} showsVerticalScrollIndicator={false} >
          {
            this.state.listcategoryLv1.map(item => {
              return (
                <View
                  style={styles.warpperItemCategory}
                  key={item.id}
                >
                  <TouchableOpacity
                  >
                    <Text style={styles.txtCategory}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingLeft: 30,
  }, 
  warpperItemCategory: {
    marginVertical: 10
  },
  txtCategory: {
    fontSize : 20,
    fontWeight: "bold"
  }
});
