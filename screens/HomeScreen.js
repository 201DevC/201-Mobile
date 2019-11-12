import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import Categorylv1 from '../components/CategoryLv1';
import Slideshow from '../components/Slideshow';
import { CATEGORY } from "../data/listcategory";
import { PRODUCT } from "../data/product";
// import axios from "axios";

const axios = require('axios');
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: 'UserName',
            listcategory: CATEGORY,
            listproduct: PRODUCT,
            listcategoryLv1: [],
            listFlashSale: [],
            listProductTrend: []

        };
    }

    _getDataCategoryLv1 = async () => {
        const data = await axios.get('http://35.240.241.27:8080/category/lv1?page=1');
        return data.data.data.content;
    }
    _getDataFlashSale = async () => {
        const data = await axios.get('http://35.240.241.27:8080/flash?offset=1');
        // console.log("----------",data.data.data.content[0].images[0]);
        return data.data.data.content;
    }
    _getDataProductTrend = async () => {
        const data = await axios.get('http://35.240.241.27:8080/product/trend');
        return data.data.data;
    }
    async componentDidMount() {
        const listcategoryLv1 = await this._getDataCategoryLv1();
        const listFlashSale = await this._getDataFlashSale();
        // console.log("+++++++++++",listFlashSale[0].images[0])
        const listProductTrend = await this._getDataFlashSale();
        this.setState({
            listcategoryLv1,
            listFlashSale,
            listProductTrend,
            isLoading: false,
        })
    }



    _goToProductDetail = (id) => {
        this.props.navigation.navigate('ProductDetail', { id: id });
    }

    onPressSearch = () => {
        this.props.navigation.navigate('Search');
    }

    onPressMenu = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        // console.log(this.state.listcategoryLv1)
        // console.log(this.state.listFlashSale.keys(1))
        


        const { isLoading } = this.state
        if (isLoading) {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <ActivityIndicator size='large' animating={isLoading} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                        <View style={styles.header}>
                            <View style={styles.tabBar}>
                                <View style={styles.buger}>
                                    <TouchableOpacity
                                        onPress={this.onPressMenu}
                                    >
                                        <FontAwesome size={20} name={"bars"} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={this.onPressSearch}
                                    style={styles.warpperSearch}
                                >
                                    <FontAwesome
                                        name='search'
                                        size={15}
                                        color='grey'
                                    />
                                    <TextInput
                                        editable={false}
                                        style={styles.searchInput}
                                        placeholder="Tìm kiếm"
                                    />


                                </TouchableOpacity>
                            </View>

                            <Slideshow />

                        </View>
                        <ScrollView style={styles.naviLv1} horizontal={true} showsHorizontalScrollIndicator={false} >
                            {
                                this.state.listcategoryLv1.map(item => {
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

                                <ScrollView style={styles.warpperFlashSaleItem} horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {
                                        this.state.listFlashSale.map(item => {
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
                                    this.state.listFlashSale.map(item => {
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
                                    this.state.listProductTrend.map(item => {
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
        justifyContent: "center",
        marginHorizontal: 5,
    },
    warpperSearch: {
        width: '90%',
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor:"white",
        alignItems: "center",
        paddingHorizontal: 10,
        marginHorizontal:5,
        height:35,
        opacity:0.8

    },
    searchInput: {
        width: '90%',
        fontSize:16,
        marginLeft:10,
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


