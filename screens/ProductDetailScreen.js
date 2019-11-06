import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import { Rating } from 'react-native-elements';

const width = Dimensions.get('window').width;

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedHeart: 0,
      focusedBookmark: 0,
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

  render() {
    const { focusedHeart, focusedBookmark } = this.state;
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
          <View style={styles.nameProduct}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Iphone X</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f1797a' }}>15.000.000 đ</Text>
          </View>
          <View style={styles.oldPrice}>
            <Text style={{ fontSize: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>19.999.000 đ</Text>
          </View>
          <View style={styles.contentBtnWrapper}>
            <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 0.5, justifyContent: 'center', alignItems: 'center', borderLeftColor: 'black',
              borderLeftWidth: 1,
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginHorizontal: 16,
            }}
          />
          <Rating startingValue={3.3} />
        </View>
      </ScrollView >
    );
  }
}


ProductDetail.navigationOptions = {
  header: (
    <View style={{
      flex: 0,
      justifyContent: "center",
      alignItems: 'flex-start',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: Constants.statusBarHeight + 4
    }}>
      <TouchableOpacity>
        <FontAwesome size={20} name="chevron-left" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    backgroundColor: 'red',
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
  }
});

