import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import Constants from 'expo-constants'
import { Icon, SocialIcon, Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import ItemProduct from '../components/ItemProduct';
import Categorylv1 from '../components/CategoryLv1';
import { CATEGORY } from "../data/listcategory";
import { PRODUCT } from "../data/product";


export default class HomeScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: 'UserName',
          listcategory: CATEGORY,
          listproduct: PRODUCT,
      };
  }


  render() {
      return (
          <View style={styles.container}>
              <ScrollView style={{ flex: 1 }} >
                  <ScrollView style={styles.naviLv1} horizontal={true} >
                      {
                          this.state.listcategory.map(item => {
                              return <Categorylv1
                                  key={item.id}
                                  data={item}
                              />
                          })
                      }
                  </ScrollView>
                  <ImageBackground source={require("../assets/images/bg.jpg")} style={styles.wrapperFlashSale}>
                      <View >
                          <View style={styles.titleFlashSale}>
                              <Text style={styles.textFlashSale}>Flash Sale</Text>
                              <TouchableOpacity style={styles.moreListFlashSale}>
                                  <Text >
                                      XEM THÊM
                                  </Text>
                              </TouchableOpacity>

                          </View>
                          <ScrollView style={styles.warpperFlashSaleItem} horizontal={true} >
                              {
                                  this.state.listproduct.map(item => {
                                      return <ItemProduct
                                          key={item.id}
                                          data={item}

                                      />
                                  })
                              }
                          </ScrollView>
                      </View>
                  </ImageBackground>
                  <View style={styles.wrapperYourLike}>
                      <Text style={styles.txtYourLike}>Bạn có thể thích</Text>

                      <View style={styles.warpperYourLikeItem}>
                          {
                              this.state.listproduct.map(item => {
                                  return <ItemProduct
                                      key={item.id}
                                      data={item}
                                  />
                              })
                          }
                      </View>
                  </View>
                  <View style={styles.wrapperYourLike}>
                      <Text style={styles.txtYourLike}>Xu Hướng</Text>

                      <View style={styles.warpperYourLikeItem}>
                          {
                              this.state.listproduct.map(item => {
                                  return <ItemProduct
                                      key={item.id}
                                      data={item}
                                  />
                              })
                          }
                      </View>
                  </View>
              </ScrollView>
          </View>


      );
  }
}
HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      backgroundColor: '#bdc3c7'
  },
  naviCategoryLv1: {
      backgroundColor: 'red'
  },
  naviLv1: {
      flex: 0.06,
      flexDirection: "row",
      backgroundColor: '#fff',
      marginBottom: 8

  },
  wrapperFlashSale: {
      flex: 0.34,
      marginBottom: 8
  },
  titleFlashSale: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5,
      alignItems: "center"
  },
  textFlashSale: {
      fontSize: 20,
      color: '#d63031',
      fontWeight: "bold",
      fontStyle: "italic"
  },
  wrapperYourLike: {
      flex: 0.6,
      backgroundColor: '#fff',
      marginBottom: 8

  },
  warpperYourLikeItem: {
      width: '100%',
      padding: 10,
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-around",

  },
  txtYourLike: {
      fontSize: 18,
      fontWeight: "bold",
      paddingVertical: 5,
      paddingLeft: 10
  }

});


