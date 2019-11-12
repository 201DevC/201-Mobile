import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';

import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import { Card, Rating } from 'react-native-elements'
import ProductCard from '../components/ProductCart';


const width = Dimensions.get('window').width;
const rating = 4.0;

const DATA = [
  {
    id: '1',
    name: "SỮA ENSURE 400g MẪU 2019-2020",
    product: "dien may xanh",
    rating: 4.0,
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: '2',
    name: "iphone x",
    product: "dien may xanh",
    rating: 4.1,
    uri: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: '3',
    name: "iphone x",
    product: "dien may xanh",
    rating: 3.5,
    uri: "https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: '4',
    name: "iphone x",
    product: "dien may xanh",
    rating: 5.0,
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: '5',
    name: "iphone x",
    product: "dien may xanh",
    rating: 4.8,
    uri: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1533&q=80",
  },
]

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedHeart: 0,
      focusedBookmark: 0,
      isRating: 0,
    };
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
    return (
      <View>
        <View style={styles.nameProduct}>
          <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }} numberOfLines={2}>Màn hình Retina sắc nét và sống động iPhone 4</Text>
          </View>
          <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f1797a' }} numberOfLines={1}>15.000.000 đ</Text>
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

  recommend = (text) => {
    return (
      <SafeAreaView style={styles.recommend}>
        <View>
          <Text style={styles.recommendHeader}>{text}</Text>
        </View>
        <FlatList
          data={DATA}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              width={width * 0.48}
              id={item.id}
              item={item}
              onPress={() => this.props.navigation.push('ProductDetail', { id: item.id })}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
        />
      </SafeAreaView>
    );
  }

  render() {
    const { focusedHeart, focusedBookmark, isRating } = this.state;
    let content = (
      <View style={styles.contentWrapper}>
        <Text>
          Màn hình Retina sắc nét và sống động iPhone 4 là một bước tiến mới của Apple trong công nghệ màn hình. Với công nghệ màn hình Retina (màn hình võng mạc), Apple đã mang tới cho người dùng một trải nghiệm mới trong việc tận hưởng chất lượng hiển thị trên màn hình smartphone. Với kích cỡ màn hình 3,5inch, cùng độ phân giải 960 x 640, mật độ điểm ảnh lên tới 326 ppi, màn hình iPhone 4 cho hình ảnh hiển thị sắc nét và mịn màng đến mức người dùng sẽ không thể cảm nhận được sự hiện diện của các điểm ảnh trên màn hình.
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
          <Text>(90 lượt đánh giá)</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://media3.scdn.vn/img3/2019/5_14/M3TZ0Q_simg_de2fe0_500x500_maxb.jpg' }}
            resizeMode='cover'
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
          {this.recommend('Sản phẩm tương tự')}
          {this.recommend('Bạn có thể thích')}
        </View>
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

