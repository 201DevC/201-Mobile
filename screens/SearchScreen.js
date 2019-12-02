import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import { PRODUCT } from '../data/product';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';


const IP_API = '35.240.241.27:8080/';
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({
      id: `blank-${numberOfElementsLastRow}`,
      emty: true,
      'images': [
      ],
      'shop_info': {
      },
    });
    numberOfElementsLastRow++;
  }
  return data;
};

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSearch: [],
      keyWord: '',
      offset: 0,
      totalResults: '',
      isLoading: false,
    };
  }


  _getData = async () => {
    const { keyWord, offset } = this.state
    const data = await axios.get(`http://${IP_API}/product/list?keyword=${keyWord}&offset=${offset}&size=10`);

    if (data.data.data.content.length === 0) {
      return this.setState({
        totalResults: 'Không tìm thấy kết quả',
        isLoading: false,
      })
    }

    return this.setState({
      listSearch: data.data.data.content,
      totalResults: data.data.data.total + ' kết quả',
      isLoading: false,

    })
  }



  onEndReached = async () => {
    const { offset, listSearch, keyWord } = this.state;
    const newoffset = offset + 10;
    const data = await axios.get(`http://${IP_API}/product/list?keyword=${keyWord}&offset=${newoffset}&size=10`);
    this.setState({
      offset: newoffset,
      listSearch: listSearch.concat(data.data.data.content),
    });
  }

  onChangeSearch = text => {
    this.setState({
      keyWord: text
    })
  }

  renderFooter = () => {
    const { listSearch, totalResults } = this.state
    if (listSearch.length === 0 && listSearch.length >= totalResults) {
      return <ActivityIndicator animating={false} />;
    } else {
      return <ActivityIndicator animating={true} />;
    }
  };

  pressSearch = async () => {
    if (this.state.keyWord === '') {
    } else {
      this.setState({
        isLoading: true
      })
      await this._getData()
    }
  }
  _onForcusInput = () => {
    this.setState({
      listSearch: [],
      keyWord: '',
      offset: 0,
      totalResults: '',
      isLoading: false,
    })
  }


  _goToProductDetail = (id) => {
    this.props.navigation.navigate('ProductDetail', { id: id, screen: 'Search' });
  }

  renderItem = ({ item }) => {
    if (item.emty === true) {
      return <View style={{ flex: 1, margin: 5, }} />;
    }
    return (
      <ItemProduct
        onPress={() => this._goToProductDetail(item.id)}
        key={item.id}
        data={item}
      />
    );
  };

  _onPressBackButton = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => {
            this.searchTextInput.focus();
          }}
        />
        <View style={styles.header}>
          <View style={styles.tabBar}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={this._onPressBackButton}
              >
                <FontAwesome size={20} name={'chevron-left'} />
              </TouchableOpacity>
            </View>

            <View
              style={styles.warpperSearch}
            >
              <TextInput
                ref={(input) => { this.searchTextInput = input; }}
                autoFocus={true}
                placeholder='Tìm kiếm'
                style={styles.txtSearch}
                onChangeText={this.onChangeSearch}
                // value={this.state.keyWord}
                onFocus={this._onForcusInput}
                onBlur={this.pressSearch}
              />
              <TouchableOpacity
                onPress={this.pressSearch}
              >
                <FontAwesome
                  name='search'
                  size={17}
                  color='grey'
                />
              </TouchableOpacity>
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
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.totalResults}</Text>
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
        {/* <View style={styles.warpperReturn}> */}
        {this.state.isLoading ?
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator />
            <Text>Dữ liệu đang tải, xin vui lòng chờ ....</Text>
          </View>
          :
          <FlatList
            data={formatData(this.state.listSearch, 2)}
            // data={this.state.listSearch}
            renderItem={this.renderItem}
            numColumns={2}
            style={{ flex: 1 }}
            keyExtractor={item => item.id}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={1}
            ListFooterComponent={this.renderFooter}
          />
        }
        {/* </View> */}
      </View>
    );
  }
}
SearchScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffdee3',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingTop: Constants.statusBarHeight

  },
  tabBar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10

  },
  back: {
    justifyContent: 'center',
  },
  warpperSearch: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 15
  },
  txtSearch: {
    fontSize: 17,
    color: 'grey',
    flex: 1
  },

  warpperFill: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 15,
    borderColor: 'grey'

  },
  nominations: {
    flexDirection: 'row',
    borderRightWidth: 1,
    justifyContent: 'space-around',
    width: '20%',
    borderColor: "grey",
    alignItems: 'center'
  },
  filter: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    width: '20%',
    justifyContent: "space-around",
    borderColor: "grey",
    alignItems: 'center'
  },
  respond: {

  },
  // warpperReturn: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flex:1
  // },
  itemInvisible: {
    backgroundColor: 'red',

  }


});
