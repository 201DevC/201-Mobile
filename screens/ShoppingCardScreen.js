import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import ItemCategoryLv1 from '../components/ItemCategoryLv1';
import ItemCategoryLv2 from '../components/ItemCategoryLv2';
import axios from "axios";
import Categorylv1 from '../components/CategoryLv1';
import { CATEGORY } from '../service/category';
import { CATEGORY2 } from '../service/categorylv2';



const IP_API = "hellodoctor.tech:8080";
export default class MenuLevel1Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listcategoryLv1: [],
      listcategoryLv2: [],
      isLoading: true,
      Id: "",
      // pressStyles: styles.pressStyles
      pressStyles: "",
      nameLv1:""

    };
  }

  _goToMenuLv2 = () => {
    this.props.navigation.navigate('MenuLevel2');
  }
  _getDataCategoryLv1 = async () => {
    const data = await axios.get(`http://${IP_API}/category/lv1`);
    return this.setState({
      listcategoryLv1: data.data.data.content,
      isLoading: false
    })
  }

  _getDataCategoryLv2 = async () => {
    const { Id } = this.state
    const data = await axios.get(`http://${IP_API}/category/lv2?parentId=${Id}`);
    console.log(data.data.data.content)
    return this.setState({
      listcategoryLv2: data.data.data.content,
    })
  }
  async componentDidMount() {
    await this._getDataCategoryLv1()
  }

  _showLv2 = async (item) => {
    await this.setState({
      Id: item.id,
      nameLv1 : item.name

    })
    await this._getDataCategoryLv2();
    this.setState({
      pressStyles: styles.pressStyles
    })
  }

  render() {
    const { isLoading, pressStyles,nameLv1 } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", color:"#fff" }}>Danh mục</Text>
        {isLoading ? <ActivityIndicator animating={isLoading} /> :
          <View style={styles.warpperCategory}>
            <ScrollView style={{ width: "25%" }} horizontal={false} showsVerticalScrollIndicator={false} >
              {
                this.state.listcategoryLv1.map(item => {
                  return <ItemCategoryLv1
                    onPress={() => this._showLv2(item)}
                    key={item.id}
                    data={item}
                  pressStyles={pressStyles}
                  />
                })
              }
            </ScrollView>
            <View style={{ width: "75%" }}>
              <Text style={{fontSize:20, textAlign:"center"}}>{nameLv1}</Text>
              <FlatList
                style={{ width: "100%" }}
                data={this.state.listcategoryLv2}
                renderItem={({ item }) => <ItemCategoryLv2

                  data={item}
                />}
                keyExtractor={item => item.id}
                numColumns={3}
              />
            </View>
          </View>
        }

      </View>
    );
  }
}
MenuLevel1Screen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ff7675"
  },
  warpperCategory: {
    flex: 1,
    flexDirection: "row",
  },
  pressStyles: {
    backgroundColor: "#ff7675"
  }

});
