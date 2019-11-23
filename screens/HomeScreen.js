import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image, Dimensions } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ItemProduct from '../components/ItemProduct';
import Categorylv1 from '../components/CategoryLv1';
import ItemFlashSale from '../components/ItemFlashSale';
import Slideshow from '../components/Slideshow';
import axios from "axios";
import { FlatList } from 'react-native-gesture-handler';

const IP_API = "35.240.241.27:8080";
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
            // isLoadingFlashSale: true,
            // isLoadingYourLike: true,
            isLoadingTendency: true,
            isLoading: true,
            listcategoryLv1: [],
            listFlashSale: [],
            listProductTrend: []

        };
        this._isMounted = false;
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
        const datalv1 = await axios.get(`http://${IP_API}/category/lv1`);
        return this.setState({
            listcategoryLv1: datalv1.data.data.content,
        })
    }
    _getDataFlashSale = async () => {
        const dataFlashSale = await axios.get(`http://${IP_API}/flash?offset=0`);
        return this.setState({
            listFlashSale: dataFlashSale.data.data.content,
            isLoading: false
        })
    }

    _getDataProductTrend = async () => {
        const dataTrend = await axios.get(`http://${IP_API}/product/trend`);
        return this.setState({
            listProductTrend: dataTrend.data.data,
            // isLoading: false
        })
    }

    _getData = async () => {
        // const datalv1 = await axios.get(`http://${IP_API}/category/lv1`);
        // const dataFlashSale = await axios.get(`http://${IP_API}/flash?offset=0`);
        const dataTrend = await axios.get(`http://${IP_API}/product/trend`);
        this._isMounted && this.setState({
            // listcategoryLv1: datalv1.data.data.content,
            // listFlashSale: dataFlashSale.data.data.content,
            listProductTrend: dataTrend.data.data,
            isLoadingTendency: false

        })
    }

    componentDidMount() {
        this._getDataCategoryLv1();
        this._getDataFlashSale();
        this._getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
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

        const { isLoading, isLoadingTendency } = this.state
        return (
            <View style={styles.warpperContainer}>
                <View style={styles.container}>
                    <View style={styles.warpperTabBar}>
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
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                        <View style={{ backgroundColor: '#ffdee3', borderBottomEndRadius: 5, borderBottomStartRadius: 5 }}>
                            <View style={styles.header}>
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
                        {isLoading ?
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 30 }}>
                                <ActivityIndicator animating={isLoading} />
                                <Text>Dữ liệu đang tải, xin vui lòng chờ...</Text>
                            </View>
                            :
                            <View>
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
                                <View style={styles.line}></View>
                                <View style={styles.wrapperYourLike}>
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={styles.txtYourLike}>Bạn có thể thích</Text>
                                            <TouchableOpacity style={{ flex: 1, alignItems: "flex-end", marginVertical: 10 }}>
                                                <Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 10 }}>
                                                    Xem thêm >
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList
                                            data={formatData(this.state.listFlashSale, 2)}
                                            renderItem={this.renderItem}
                                            numColumns={2}
                                            style={{ flex: 1 }}
                                            keyExtractor={item => item.id}
                                        />

                                        <TouchableOpacity onPress={() => this._goToHistory()} style={{ marginVertical: 10 }}>
                                            <Text style={{ color: "#0984e3", textAlign: "right", paddingHorizontal: 10, fontWeight: 'bold', fontSize: 16 }}>
                                                Dựa trên sản phẩm bạn đã xem >
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.line}></View>

                                <View style={styles.wrapperYourLike}>
                                    <Text style={styles.txtYourLike}>Xu Hướng</Text>
                                    {isLoadingTendency ?
                                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                            <ActivityIndicator animating={isLoadingTendency} />
                                        </View>
                                        :
                                        <FlatList
                                            data={formatData(this.state.listProductTrend, 2)}
                                            renderItem={this.renderItem}
                                            numColumns={2}
                                            style={{ flex: 1 }}
                                            keyExtractor={item => item.id}
                                        />
                                    }
                                </View>
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
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
        paddingTop: Constants.statusBarHeight + 62

    },
    warpperTabBar: {
        width: "100%",
        paddingTop: Constants.statusBarHeight,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: "#ffdee3",
        paddingHorizontal: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5

    },
    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginVertical: 10,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        // width: Dimensions.get("window").width - 20,
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
        borderBottomColor: "grey"
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
        borderBottomColor: "grey"

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
        marginLeft: 10
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#bdc3c7',
        width: Dimensions.get("window").width - 20,
        marginHorizontal: 10,
        marginVertical: 10
    }


});


