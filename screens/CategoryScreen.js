import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import ItemCategoryLv1 from '../components/ItemCategoryLv1';
import ItemCategoryLv2 from '../components/ItemCategoryLv2';
import axios from "axios";
import { REUSE } from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listcategoryLv1: [],
      listcategoryLv2: [],
      isLoading: true,
      isLoadingLv2: false,
      Id: "8",
    };
    this._isMounted = false;
    this.backHandler = null;
  }

  _getDataCategoryLv1 = async () => {
    const data = await axios.get(`http://${IP_API}/category/lv1`);
    const listcategoryLv1 = data.data.data.content.map((item) => {
      item.choose = 0;
      return item
    })
    listcategoryLv1[0].choose = 1;
    this._isMounted && this.setState({
      listcategoryLv1,
      isLoading: false
    })
  }

  _getDataCategoryLv2 = async () => {
    const { Id } = this.state
    const data = await axios.get(`http://${IP_API}/category/lv2?parentId=${Id}`);
    this._isMounted && this.setState({
      listcategoryLv2: data.data.data.content,
      isLoadingLv2: false
    })
  }

  onPressShowmore = (lv, id, name) => {
    this.props.navigation.navigate('ShowMore', { lvCate: lv, idCate: id, nameCate: name });
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    const screen = this.props.navigation.getParam('screen');
    if (screen) {
      navigation.navigate(screen);
    } else {
      navigation.goBack();
    }
    return true;
  }

  componentDidMount() {
    this._isMounted = true;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this._getDataCategoryLv1();
    this._getDataCategoryLv2();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.backHandler.remove()
  }

  _showLv2 = async item => {
    let { listcategoryLv1 } = this.state;

    const foundIndex = listcategoryLv1.findIndex(category => category.id === item.id);
    const found = listcategoryLv1[foundIndex];

    if (found.choose === 0) {
      listcategoryLv1.map((item) => {
        item.choose = 0;
      })
      found.choose = 1;
    }
    await this.setState({
      Id: item.id,
      listcategoryLv2: [],
      isLoadingLv2: true
    })
    await this._getDataCategoryLv2();

  }

  render() {
    const { isLoading, isLoadingLv2 } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 10 }}>
          <View style={styles.back}>
            <TouchableOpacity
              onPress={this.handleBackPress}
            >
              <FontAwesome size={20} name={'chevron-left'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.txtTitle}>Danh mục</Text>
        </View>
        {isLoading ? <ActivityIndicator animating={isLoading} /> :
          <View style={styles.warpperCategory}>
            <ScrollView style={{ width: "25%" }} horizontal={false} showsVerticalScrollIndicator={false} >
              {
                this.state.listcategoryLv1.map(item => {
                  return <ItemCategoryLv1
                    onPress={() => this._showLv2(item)}
                    key={item.id}
                    data={item}
                  />
                })
              }
            </ScrollView>
            <View style={{ width: "75%" }}>
              {/* <Text style={{fontSize:20, textAlign:"center"}}>{nameLv1}</Text> */}
              {
                isLoadingLv2 ? <ActivityIndicator animating={isLoadingLv2} />
                  :
                  <FlatList
                    style={{ width: "100%" }}
                    data={this.state.listcategoryLv2}
                    renderItem={({ item }) => <ItemCategoryLv2
                      onPress={() => this.onPressShowmore(2, item.id, item.name)}
                      data={item}
                    />}
                    keyExtractor={item => item.id}
                    numColumns={3}
                  />
              }
            </View>
          </View>
        }

      </View>
    );
  }
}

CategoryScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: REUSE.MAIN_COLOR
  }, back: {
    width: '20%'
  },
  txtTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10
  },
  warpperCategory: {
    flex: 1,
    flexDirection: "row",
  },
  pressStyles: {
    backgroundColor: "#ff7675"
  }

});
