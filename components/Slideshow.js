import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native'

const { width } = Dimensions.get('window');
const height = width * 0.44;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      sliderIndex: 0,
      maxSlider: 2,
      banners: [
        { _id: '1', imageUrl: require('../assets/images/banner01.jpg') },
        { _id: '2', imageUrl: require('../assets/images/banner02.jpg')},
        { _id: '3', imageUrl: require('../assets/images/banner03.jpg') },
      ],
    }
  }

  setRef = (c) => {
    this.listRef = c;
  }

  scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollToIndex({ index, animated })
  }

  _autoScroll = setInterval(function () {
    const { sliderIndex, maxSlider } = this.state
    let nextIndex = 0

    if (sliderIndex < maxSlider) {
      nextIndex = sliderIndex + 1
    }

    this.scrollToIndex(nextIndex, true)
    this.setState({ sliderIndex: nextIndex })
  }.bind(this), 3000);

  componentWillMount() {
    this._autoScroll;
  }

  componentWillUnmount() {
    clearInterval(this._autoScroll);
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <FlatList
            getItemLayout={(data, index) => { return { length: width, index, offset: width * index } }}
            ref={this.setRef}
            data={this.state.banners}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={item => item._id}
            renderItem={({ item, i }) => (
              <View key={i} style={{ height, width }}>
                <Image resizeMode='stretch' style={{ height, width }} source={item.imageUrl} />
              </View>
            )}
            onMomentumScrollEnd={(event) => {
              let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x / width : 0
              this.setState({ sliderIndex })
            }}
          />
          <View style={styles.sliderContainer}>
            {
              this.state.banners.map(function (item, index) {
                return (
                  <View key={index} style={styles.sliderBtnContainer}>
                    <View style={styles.sliderBtn}>
                      {
                        this.state.sliderIndex == index ? <View style={styles.sliderBtnSelected} /> : null
                      }
                    </View>
                  </View>
                )
              }.bind(this))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    flex: 1
  },
  sliderContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center'
  },
  sliderBtn: {
    height: 8,
    width: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sliderBtnSelected: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  sliderBtnContainer: {
    flexDirection: 'row', marginBottom: 8
  },
});
