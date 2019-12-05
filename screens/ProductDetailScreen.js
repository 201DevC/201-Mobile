import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  AsyncStorage
} from 'react-native';

import Constants from 'expo-constants';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Image, Rating } from 'react-native-elements'
import axios from 'axios';
import NumberFormat from 'react-number-format';
import ItemProduct from '../components/ItemProduct';
import { REUSE } from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRating: 0,
      detail: {},
      listTrend: [],
      listRelation: [],
      isLoading: true,
      isLoadingTrend: true,
      isLoadingRelation: true,
      colorHeart: '#2f3542',
      colorBookmark: '#2f3542',
      colorDetailBtn: 'black',
      colorRatingBtn: '#cdc6c6'
    };
    this._isMounted = false;
    this.backHandler = null;
  }

  _getDataDetail = async () => {
    const id = this.props.navigation.getParam('id');
    const username = await AsyncStorage.getItem('username');
    const data = await axios.get(`http://${IP_API}/product/` + id, {
      params: {
        userId: username,
      }
    });

    return this.setState({
      detail: data.data.data,
      isLoading: false
    });
  }

  _getDataRelation = async () => {
    const id = this.props.navigation.getParam('id');
    const username = await AsyncStorage.getItem('username');
    const data = await axios.get(`http://${IP_API}/product/${id}/relation`, {
      params: {
        userId: username,
      }
    });
    const listRelation = data.data.data.filter(item => item !== null);
    return this.setState({
      listRelation,
      isLoadingRelation: false
    });
  }

  _getDataRecommend = async () => {
    const username = await AsyncStorage.getItem('username');
    const data = await axios.get(`http://${IP_API}/product/recommend`, {
      params: {
        userId: username,
      }
    });
    const listTrend = data.data.data.filter(item => item !== null);

    return this.setState({
      listTrend,
      isLoadingTrend: false
    });
  }

  _getData = async () => {
    this._getDataDetail();
    this._getDataRelation();
    this._getDataRecommend();
  }

  _referData = () => {
    this.setState({
      isRating: 0,
      detail: {},
      listTrend: [],
      listRelation: [],
      isLoading: true,
      isLoadingTrend: true,
      isLoadingRelation: true
    });
    this._getData();
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
    this._getData();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.backHandler.remove()
  }

  onPressHeart = () => {
    const colorHeart = this.state.colorHeart === '#2f3542' ? '#EA2027' : '#2f3542'
    this.setState({ colorHeart })
  }

  onPressBookmark = () => {
    const colorBookmark = this.state.colorBookmark === '#2f3542' ? '#FFC312' : '#2f3542'
    this.setState({ colorBookmark })
  }

  onPressContentBtn = (isRating) => {
    if (isRating) {
      return this.setState({
        isRating,
        colorDetailBtn: '#cdc6c6',
        colorRatingBtn: 'black'
      });
    } else {
      return this.setState({
        isRating,
        colorDetailBtn: 'black',
        colorRatingBtn: '#cdc6c6'
      });
    }
  }

  _goToProductDetail = (id) => {
    this.props.navigation.push('ProductDetail', { id: id });
  }

  onPressSearch = () => {
    this.props.navigation.navigate('Search');
  }

  onPressHome = () => {
    this.props.navigation.navigate('Home');
  }

  recommend = (text, data, isLoading) => {
    return (
      <SafeAreaView style={styles.recommend}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.recommendHeader}>{text}</Text>
          <TouchableOpacity style={{ flex: 1, alignItems: "flex-end", marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 10 }}>
              Xem thêm >
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator />}
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ItemProduct
              onPress={() => this._goToProductDetail(item.id)}
              key={item.id}
              data={item}
            />
          )
          }
          keyExtractor={item => item.id.toString()}
          horizontal
        />
      </SafeAreaView>
    );
  }

  _rating = () => {
    const { detail } = this.state
    const rating = detail.rating_info.percent_number / 100 * 5;
    return rating;
  }

  contentBtnWrapper = (colorDetailBtn, colorRatingBtn) => {
    return (
      <View style={styles.contentBtnWrapper}>
        <TouchableOpacity
          onPress={() => this.onPressContentBtn(0)}
          style={styles.contentBtn}
        >
          <Text style={[styles.contentBtnText, { color: colorDetailBtn }]}>Chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onPressContentBtn(1)}
          style={[
            styles.contentBtn,
            { borderLeftColor: 'black', borderLeftWidth: 1, }
          ]}>
          <Text style={[styles.contentBtnText, { color: colorRatingBtn }]}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _content = () => {
    const { isRating, detail } = this.state;
    let content = (
      <View style={styles.contentWrapper}>
        <Text style={styles.txtDetail}>
          {detail.short_description}
        </Text>
      </View>
    );
    if (isRating) {
      content = (
        <View style={styles.contentWrapper}>
          <View style={styles.ratingText}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{this._rating().toFixed(1)}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f1797a' }}>/5</Text>
          </View>
          <Rating readonly startingValue={this._rating()} />
          <Text>({detail.rating_info.total_rated} lượt đánh giá)</Text>
        </View>
      );
    }
    return content;
  }

  render() {
    const {
      isLoading,
      detail,
      listRelation,
      listTrend,
      colorHeart,
      colorBookmark,
      colorDetailBtn,
      colorRatingBtn,
      isLoadingRelation,
      isLoadingTrend
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.warpperTabBar}>
          <View style={styles.tabBar}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={this.handleBackPress}
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
            <TouchableOpacity
              style={styles.warpperBtnHome}
              onPress={this.onPressHome}>
              <MaterialCommunityIcons color='#2c3e50' size={28} name={"home-outline"} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={this._referData} />
          }
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {
            isLoading ?
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: Constants.statusBarHeight + 40 }}>
                <Text>Dữ liệu đang tải, vui lòng đợi trong giây lát...</Text>
              </View>
              :
              <View style={styles.warpperBody}>
                <View style={styles.header}>
                  <Image
                    source={{ uri: detail.images[0] }}
                    resizeMode='cover'
                    PlaceholderContent={<ActivityIndicator />}
                    style={{ width: '100%', height: '100%' }}
                  />
                  <View style={styles.warpperHeartAndBookmark}>
                    <TouchableOpacity
                      style={styles.btnIcon}
                      onPress={this.onPressHeart}
                    >
                      <Entypo color={colorHeart} size={25} name={colorHeart === '#2f3542' ? 'heart-outlined' : 'heart'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnIcon}
                      onPress={this.onPressBookmark}
                    >
                      <FontAwesome color={colorBookmark} size={25} name={colorBookmark === '#2f3542' ? 'bookmark-o' : 'bookmark'} />
                      {/* bookmark */}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.body}>
                  <Text style={styles.txtNameProduct}>{detail.name}</Text>
                  <View style={styles.warpperPrice}>
                    <NumberFormat
                      value={detail.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={''}
                      renderText={value => <Text
                        style={styles.txtSalePrice}
                        numberOfLines={1}>
                        {value} đ
                        </Text>
                      }
                    />
                    <NumberFormat
                      value={detail.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={''}
                      renderText={value => <Text
                        style={[styles.fontSize20, styles.txtOldPrice]}
                        numberOfLines={1}>
                        {value} đ
                        </Text>
                      }
                    />

                  </View>
                  <View style={detail.order_count != 0 ? styles.warpperOrderCount : styles.none}>
                    <FontAwesome size={16} color='#747d8c' name={"tag"} />
                    <Text style={styles.txtOrderCount} numberOfLines={1}>Đã bán được {detail.order_count} sản phẩm</Text>
                  </View>
                  {this.contentBtnWrapper(colorDetailBtn, colorRatingBtn)}
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      marginHorizontal: 16,
                    }}
                  />
                  {this._content()}
                  {this.recommend('Sản phẩm tương tự', listRelation, isLoadingRelation)}
                  <View style={styles.line}></View>
                  {this.recommend('Bạn có thể thích', listTrend, isLoadingTrend)}
                </View>
              </View>
          }
        </ScrollView >
        <View style={styles.warrperFooter}>
          <TouchableOpacity style={[styles.warpperComment, styles.allFooter]}>
            <MaterialIcons size={25} color='#34495e' name={"comment"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.warpperCard, styles.allFooter]}>
            <Text style={styles.txtCard}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.warpperBuyNow, styles.allFooter]}>
            <Text style={styles.txtBuyNow}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


ProductDetail.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: Constants.statusBarHeight + 40,
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
    fontSize: 17,
    height: '100%'
  },
  warpperBtnHome: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  warpperBody: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    width: Dimensions.get('window').width,
    height: 320,
    position: 'relative'
  },
  warpperHeartAndBookmark: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    flexDirection: 'row'
  },
  body: {
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  btnIcon: {
    backgroundColor: '#f1f2f6',
    marginLeft: 10,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtNameProduct: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  warpperPrice: {
    minHeight: 40,
    marginBottom: 5,
    justifyContent: 'center',
  },
  txtSalePrice: {
    color: '#eb2f06',
    fontSize: 20,
  },
  txtOldPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 14,
    color: '#a4b0be'
  },
  warpperOrderCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  txtOrderCount: {
    fontSize: 16,
    color: '#EE5A24',
    marginLeft: 5
  },
  // oldPrice: {
  //   paddingHorizontal: 16,
  //   alignItems: 'flex-end',
  // },
  contentBtnWrapper: {
    marginTop: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 16,
    minHeight: 150,
    paddingTop: 5
  },
  txtDetail: {
    fontSize: 15
  },
  ratingText: {
    flexDirection: 'row',
    color: 'yellow',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  fontSize20: {
    fontSize: 20,
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  contentBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommend: {
    marginVertical: 8,
  },
  recommendHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  warrperFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    padding: 8,
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: '#bdc3c7'
  },
  allFooter: {
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warpperComment: {
    width: '15%',
    height: 40,
    backgroundColor: '#ced6e0',

  },
  warpperCard: {
    width: '50%',
    backgroundColor: '#ced6e0',
  },
  txtCard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34495e'
  },
  warpperBuyNow: {
    width: '30%',
    backgroundColor: '#e74c3c',
  },
  txtBuyNow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#bdc3c7',
    width: Dimensions.get("window").width - 20,
    marginHorizontal: 10,
    marginVertical: 10
  },
  none: {
    display: 'none'
  }
});


