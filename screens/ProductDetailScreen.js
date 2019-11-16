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
  RefreshControl
} from 'react-native';

import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import { Image, Rating } from 'react-native-elements'
import ProductCard from '../components/ProductCart';
import axios from 'axios';
import NumberFormat from 'react-number-format';


const width = Dimensions.get('window').width;

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedHeart: 0,
      focusedBookmark: 0,
      isRating: 0,
      detail: {},
      listTrend: [],
      listRelation: [],
      isLoading: true,
      isLoadingTrend: true,
      isLoadingRelation: true,
    };
    this._isMounted = false;
  }

  _getDataDetail = async () => {
    const id = this.props.navigation.getParam('id');
    const data = await axios.get('http://35.240.241.27:8080/product/' + id);
    this._isMounted && this.setState({ detail: data.data.data, isLoading: false });
  }

  _getDataRelation = async () => {
    const id = this.props.navigation.getParam('id');
    const data = await axios.get(`http://35.240.241.27:8080/product/${id}/relation`);
    this._isMounted && this.setState({
      listRelation: data.data.data, isLoadingRelation: false
    })
  }

  _getDataTrend = async () => {
    const data = await axios.get('http://35.240.241.27:8080/product/trend');
    this._isMounted && this.setState({
      listTrend: data.data.data, isLoadingTrend: false
    })
  }

  _getData = async () => {
    this._getDataDetail();
    await this._getDataRelation();
    this._getDataTrend();
  }

  _referData = () => {
    this.setState({ listRelation: [], listTrend: [], isLoading: true, isLoadingRelation: true, isLoadingTrend: true });
    this._getData();
  }

  componentDidMount() {
    this._isMounted = true;
    this._getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onPressHeart = () => {
    const focusedHeart = this.state.focusedHeart ? 0 : 1;
    this.setState({ focusedHeart })
  }

  onPressBookmark = () => {
    const focusedBookmark = this.state.focusedBookmark ? 0 : 1;
    this.setState({ focusedBookmark })
  }

  onPressContentBtn = (isRating) => {
    this.setState({ isRating });
  }



  like = (focusedHeart, focusedBookmark) => {
    return (
      <View style={styles.like}>
        <TouchableOpacity
          style={styles.icon}
          onPress={this.onPressHeart}
        >
          <TabBarIcon
            name='heart-o'
            focusedColor='#f1797a'
            defaultColor='black'
            focused={focusedHeart}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={this.onPressBookmark}
        >
          <TabBarIcon
            style={styles.icon}
            name='bookmark'
            focused={focusedBookmark}
          />
        </TouchableOpacity>
      </View>
    );
  }

  price = () => {
    const { detail } = this.state;
    const new_price = detail ? detail.price : 0;
    return (
      <View>
        <View style={styles.nameProduct}>
          <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }} numberOfLines={2}>{detail.name}</Text>
          </View>
          <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
            <NumberFormat
              value={new_price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              renderText={value => <Text
                style={{ fontSize: 24, fontWeight: 'bold', color: '#f1797a' }}
                numberOfLines={1}>
                {value} đ
                </Text>
              }
            />
          </View>
        </View>
        <View style={styles.oldPrice}>
          <Text style={[styles.fontSize20, styles.oldPriceText]} numberOfLines={1}>19.999.000 đ</Text>
        </View>
      </View>
    );
  }

  contentBtnWrapper = (colorDetailBtn, colorRatingBtn) => {
    return (
      <View style={styles.contentBtnWrapper}>
        <TouchableOpacity
          onPress={() => this.onPressContentBtn(0)}
          style={styles.contentBtn}
        >
          <Text style={[styles.contentBtnText, colorDetailBtn]}>Chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onPressContentBtn(1)}
          style={[
            styles.contentBtn,
            { borderLeftColor: 'black', borderLeftWidth: 1, }
          ]}>
          <Text style={[styles.contentBtnText, colorRatingBtn]}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    );
  }

  recommend = (text, isLoading, data) => {
    return (
      <SafeAreaView style={styles.recommend}>
        <View>
          <Text style={styles.recommendHeader}>{text}</Text>
        </View>
        {isLoading && <ActivityIndicator />}
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              width={width * 0.48}
              item={item}
              onPress={() => this.props.navigation.push('ProductDetail', { id: item.id })}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
        />
      </SafeAreaView>
    );
  }

  render() {
    const { focusedHeart, focusedBookmark, isRating, isLoading, detail, isLoadingRelation, isLoadingTrend, listRelation, listTrend } = this.state;
    const total_rated = detail.rating_info ? detail.rating_info.total_rated : 0;
    const percent_number = detail.rating_info ? detail.rating_info.percent_number : 100;
    const rating =  percent_number/100*5;
    let content = (
      <View style={styles.contentWrapper}>
        <Text>
          {detail.short_description}
        </Text>
      </View>
    );
    let colorDetailBtn = { color: 'black' };
    let colorRatingBtn = { color: '#cdc6c6' };
    if (isRating) {
      colorDetailBtn = { color: '#cdc6c6' };
      colorRatingBtn = { color: 'black' };
      content = (
        <View style={styles.contentWrapper}>
          <View style={styles.ratingText}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{rating.toFixed(1)}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f1797a' }}>/5</Text>
          </View>
          <Rating readonly startingValue={rating} />
          <Text>({total_rated} lượt đánh giá)</Text>
        </View>
      );
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={this._referData} />
        }
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {
          isLoading ?
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: Constants.statusBarHeight + 4 }}>
              <ActivityIndicator size='large' animating={isLoading} />
              <Text>Dữ liệu đang tải, vui lòng đợi trong giây lát...</Text>
            </View>
            : <React.Fragment>
              <View style={styles.header}>
                <Image
                  source={{ uri: detail.images[0] }}
                  resizeMode='cover'
                  PlaceholderContent={<ActivityIndicator />}
                  style={{ width: width * 0.8, height: width * 0.8 }}
                />
              </View>
              <View style={styles.body}>
                {this.like(focusedHeart, focusedBookmark)}
                {this.price(focusedHeart, focusedBookmark)}
                {this.contentBtnWrapper(colorDetailBtn, colorRatingBtn)}
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginHorizontal: 16,
                  }}
                />
                {content}
                {this.recommend('Sản phẩm tương tự', isLoadingRelation, listRelation)}
                {this.recommend('Bạn có thể thích', isLoadingTrend, listTrend)}
              </View>
            </React.Fragment>
        }
      </ScrollView >
    );
  }
}


ProductDetail.navigationOptions = ({ navigation }) => {
  const tabBarVisible = false;
  return {
    header: (
      <View style={{
        flex: 0,
        justifyContent: "center",
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: Constants.statusBarHeight + 8,
        paddingLeft: 8
      }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <FontAwesome size={24} name="arrow-left" />
        </TouchableOpacity>
      </View >
    ),
    tabBarVisible: false,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 4,

  },
  body: {
    backgroundColor: 'white'
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 32,
  },
  icon: {
    marginRight: 20,
  },
  nameProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  oldPrice: {
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  contentBtnWrapper: {
    marginTop: 24,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
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
  oldPriceText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommend: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  recommendHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

