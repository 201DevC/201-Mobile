import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput, Keyboard, ActivityIndicator } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import Categorylv1 from '../components/CategoryLv1';
import Slideshow from '../components/Slideshow';
import { CATEGORY } from "../data/listcategory";
import axios from "axios";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: 'UserName',
            listcategory: CATEGORY,
            listcategoryLv1: [],
            listFlashSale: [],
            listProductTrend: []

        };
    }

    _getDataCategoryLv1 = async () => {
        const data = await axios.get('http://hellodoctor.tech:8080/category/lv1?page=1');
        return this.setState({
            listcategoryLv1: data.data.data.content
        })
    }
    _getDataFlashSale = async () => {
        const data = await axios.get('http://hellodoctor.tech:8080/flash?offset=1&size=15');
        return this.setState({
            listFlashSale: data.data.data.content
        })
    }
    _getDataProductTrend = async () => {
        const data = await axios.get('http://hellodoctor.tech:8080/product/trend');
        return this.setState({
            listProductTrend: data.data.data
        })
    }
    async componentDidMount() {

        await this._getDataCategoryLv1();
        await this._getDataFlashSale();
        await this._getDataProductTrend();

        await this.setState({
            isLoading: false
        })

    }

    _goToProductDetail = (id) => {
        this.props.navigation.navigate('ProductDetail', { id: id });
    }

    _goToHistory = () => {
        this.props.navigation.navigate('History');
    }

    onPressSearch = () => {
        this.props.navigation.navigate('Search');
    }

    onPressMenu = () => {
        this.props.navigation.openDrawer();
    }

    render() {

        const { isLoading } = this.state
        if (isLoading) {
            return (
                <View style={styles.warpperContainer}>
                    <View style={styles.container}>
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
                                    <View style={styles.warpperTxt}>
                                        <Text style={styles.txtTimKiem}>Tìm kiếm trên </Text>
                                        <Text style={styles.txtSendo}>Sendo</Text>
                                    </View>

                                </TouchableOpacity>
                                <FontAwesome
                                    name='search'
                                    size={17}
                                    color='grey'
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: "center", flex: 1, justifyContent: "center", height: "100%" }}>
                            <ActivityIndicator size='large' animating={isLoading} />
                            <Text>Dữ liệu đang load, xin vui lòng đợi ...</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.warpperContainer}>
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
                                        <View style={styles.warpperTxt}>
                                            <Text style={styles.txtTimKiem}>Tìm kiếm trên </Text>
                                            <Text style={styles.txtSendo}>Sendo</Text>
                                        </View>

                                    </TouchableOpacity>
                                    <FontAwesome
                                        name='search'
                                        size={17}
                                        color='grey'
                                    />
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
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                                    <Text style={styles.txtYourLike}>Bạn có thể thích</Text>
                                    <TouchableOpacity
                                        onPress={() => this._goToHistory()}
                                    >
                                        <Text style={{ color: "#0984e3", }}> Dựa trên sản phẩm bạn đã xem ></Text>
                                    </TouchableOpacity>
                                </View>

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
                                <TouchableOpacity style={{ flex: 1, alignItems: "flex-end", marginVertical: 10 }}><Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 10 }}> Xem thêm ></Text></TouchableOpacity>
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
                </View>


            );
        }


    }
}
HomeScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    warpperContainer: {
        flex: 1,
        backgroundColor: '#ff7675'
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight

    },
    header: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",

    },
    tabBar: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        backgroundColor: "white",
        marginVertical: 10,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        width: "97%",
        borderRadius: 5,
        height: 42
    },
    buger: {
        justifyContent: "center",
    },
    warpperSearch: {
        flexDirection: "row",
        alignItems: "center",
        opacity: 0.8,
        flex: 1,
        justifyContent: "space-around"
    },
    warpperTxt: {
        flexDirection: "row"
    },
    txtTimKiem: {
        color: 'grey',
        fontSize: 17
    },
    txtSendo: {
        fontWeight: "bold",
        color: 'red',
        fontSize: 17
    },
    naviCategoryLv1: {
        backgroundColor: 'red'
    },
    naviLv1: {
        flexDirection: "row",
        paddingVertical: 10
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
        padding: 5,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",

    },
    txtYourLike: {
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 5,
    }

});


