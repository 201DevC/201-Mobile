import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import { PRODUCT } from "../data/product";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSearch: PRODUCT



    };
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.tabBar}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={this.onPressMenu}
              >
                <FontAwesome size={20} name={"chevron-left"} />
              </TouchableOpacity>
            </View>

            <View
              style={styles.warpperSearch}
            >
              <TextInput
                placeholder="Tìm kiếm"
                style={styles.txtSearch}
              />
              <FontAwesome
                name='search'
                size={17}
                color='grey'
              />
            </View>

          </View>

        </View>
        <View style={styles.warpperFill}>
          <View style={styles.nominations}>
            <FontAwesome
              name='caret-down'
              size={17}
              color='grey'
            />
            <Text>Đề cử</Text>
          </View>
          <View style={styles.respond}>
            <Text style={{fontSize:16, fontWeight:"bold"}}>50 kết quả</Text>
          </View>
          <View style={styles.filter}>
            <FontAwesome
              name='filter'
              size={17}
              color='grey'
            />
            <Text>Lọc</Text>
          </View>

        </View>
        <View style={styles.warpperReturn}>
          <FlatList
            data={this.state.listSearch}
            renderItem={({ item }) => (
              <ItemProduct
                key={item.id}
                data={item}
              />
            )}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight
  },
  header: {
    backgroundColor: '#ff7675',
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10

  },
  tabBar: {
    flexDirection: "row",
    width: '100%',
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 10

  },
  back: {
    justifyContent: "center",
  },
  warpperSearch: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.8,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    marginLeft: 15,
    paddingHorizontal: 10
  },
  txtSearch: {
    fontSize: 18,
    color: "grey",
  },
  
  warpperFill:{
    flexDirection:"row",
    borderBottomWidth:1,
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:15,
    height:40,
    marginBottom:15,
    borderColor:"grey"
    
  },
  nominations:{
    flexDirection:"row",
    borderRightWidth:1,
    justifyContent:"space-around",
    width:'20%',
    borderColor:"grey"
  },
  filter:{
    flexDirection:"row",
    borderLeftWidth:1,
    width:'20%',
    justifyContent:"space-around",
    borderColor:"grey"
  },
  respond:{

  },
  warpperReturn: {
    justifyContent: "center",
    alignItems: "center",
  },


});