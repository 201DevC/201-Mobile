import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import Categorylv1 from '../components/CategoryLv1';
import ItemFlashSale from '../components/ItemFlashSale';
import Slideshow from '../components/Slideshow';
import axios from "axios";
import { FlatList } from 'react-native-gesture-handler';

const IP_API = "hellodoctor.tech:8080";
const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({
            id: `blank-${numberOfElementsLastRow}`,
            emty: true,
            "images": [
            ],
            "shop_info": {
            },
        });
        numberOfElementsLastRow++;
    }
    return data;
};

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingFlashSale: true,
            isLoadingYourLike: true,
            isLoadingTendency: true,
            listcategoryLv1: [],
            listFlashSale: [],
            listProductTrend: []

        };
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

    _getDataCategoryLv1 = async () => {
        const data = await axios.get(`http://${IP_API}/category/lv1`);
        return this.setState({
            listcategoryLv1: data.data.data.content,

        })
    }
    _getDataFlashSale = async () => {
        const data = await axios.get(`http://${IP_API}/flash?offset=0`);
        return this.setState({
            listFlashSale: data.data.data.content,
            isLoadingFlashSale: false
        })
    }
    _getDataProductTrend = async () => {
        const data = await axios.get(`http://${IP_API}/product/trend`);
        return this.setState({
            listProductTrend: data.data.data,
            isLoadingTendency: false
        })
    }
    _getData = async () => {
        // await this._getDataFlashSale();
        await this._getDataProductTrend();
    }
    async componentDidMount() {
        this._getData();
        await this._getDataCategoryLv1();
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

        const { isLoading, isLoadingFlashSale } = this.state
        // if (isLoadingFlashSale) {
        //     return (
        //         <View style={{ alignItems: "center", flex: 1, justifyContent: "center", height: "100%" }}>
        //             <ActivityIndicator size='large' animating={isLoadingFlashSale} />
        //             <Text>Dữ liệu đang load, xin vui lòng đợi ...</Text>
        //         </View>
        //     );
        // } else {
        return (
            <View style={styles.warpperContainer}>
                <View style={styles.container}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                        <View style={{ backgroundColor: '#ff7675', borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
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
                        </View>
                        <View style={styles.wrapperFlashSale}>
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
                                            return <ItemFlashSale
                                                onPress={() => this._goToProductDetail(item.id)}
                                                key={item.id}
                                                data={item}
                                            />
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.wrapperYourLike}>
                            {this.state.isLoadingTendency ? <ActivityIndicator />
                                :
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                                        <Text style={styles.txtYourLike}>Bạn có thể thích</Text>
                                        <TouchableOpacity
                                            onPress={() => this._goToHistory()}
                                        >
                                            <Text style={{ color: "#0984e3", }}> Dựa trên sản phẩm bạn đã xem ></Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={formatData(this.state.listFlashSale, 2)}
                                        renderItem={this.renderItem}
                                        numColumns={2}
                                        style={{ flex: 1 }}
                                        keyExtractor={item => item.id}
                                    />
                                    <TouchableOpacity style={{ flex: 1, alignItems: "flex-end", marginVertical: 10 }}><Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 10 }}> Xem thêm ></Text></TouchableOpacity>
                                </View>
                            }

                        </View>

                        {this.state.isLoadingTendency ? <ActivityIndicator /> :
                            <View style={styles.wrapperYourLike}>
                                <Text style={styles.txtYourLike}>Xu Hướng</Text>
                                <FlatList
                                    data={formatData(this.state.listProductTrend, 2)}
                                    renderItem={this.renderItem}
                                    numColumns={2}
                                    style={{ flex: 1 }}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
    // }
}
HomeScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    warpperContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    },
    header: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight

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
        height: 42,
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
        marginBottom: 8,
        borderBottomWidth: 1,
        paddingBottom: 10
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
    },


});


