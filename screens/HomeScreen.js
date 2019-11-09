import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import Categorylv1 from '../components/CategoryLv1';
import Slideshow from '../components/Slideshow';
import { CATEGORY } from "../data/listcategory";
import { PRODUCT } from "../data/product";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'UserName',
            listcategory: CATEGORY,
            listproduct: PRODUCT,
        };
    }

    _goToProductDetail = (id) => {
        this.props.navigation.navigate('ProductDetail', { id: id });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} >
                    <View style={styles.header}>
                        <View style={styles.tabBar}>
                            <View style={styles.buger}>
                                <TouchableOpacity >
                                    <FontAwesome size={25} name={"bars"} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.warpperSearch}>
                                <TextInput
                                    style={styles.searchInput}
                                />
                                <TouchableOpacity>
                                    <Icon
                                        name='search'
                                        size={20}
                                        color='black'
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* <Input
                                containerStyle={styles.searchInput}
                                leftIconContainerStyle={{paddingRight:10}}
                                placeholder='Tìm kiếm'
                                leftIcon={
                                    <Icon
                                        name='search'
                                        size={20}
                                        color='black'
                                    />
                                }
                            /> */}
                        </View>

                        <Slideshow />

                    </View>
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
                                            onPress={() => this._goToProductDetail(item.id)}
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
                                        onPress={() => this._goToProductDetail(item.id)}
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
                                        onPress={() => this._goToProductDetail(item.id)}
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
    header: {
        position: "relative",
        backgroundColor: 'red',
        flex: 1,
        backgroundColor: 'green'

    },
    tabBar: {
        flexDirection: "row",
        padding: 10,
        width: '100%',
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
        justifyContent: "space-between",
        paddingHorizontal: 10,

    },
    buger: {
        justifyContent:"center",
        marginHorizontal: 5,
        width: '10%'

    },
    warpperSearch: {
        width: '80%',
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 10
    },
    searchInput: {
        width: '90%'
    },
    naviCategoryLv1: {
        backgroundColor: 'red'
    },
    naviLv1: {
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


