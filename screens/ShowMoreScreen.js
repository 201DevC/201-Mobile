import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import ItemProduct from '../components/ItemProduct';
import Constants from 'expo-constants';
import axios from "axios";
import {REUSE} from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({
            id: `blank-${numberOfElementsLastRow}`,
            emty: true,
            'images': [
            ],
            'shop_info': {
            },
        });
        numberOfElementsLastRow++;
    }
    return data;
};
export default class ShowMoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            title: '',
            idCate: '',
            lvCate: '',
            offset: 0,
            totalResults: '',
            isLoading: true,
        };
        this._isMounted = false;
        this.backHandler = null;
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

    onEndReached = async () => {
        const { offset, lvCate, idCate, listData } = this.state;
        const newoffset = offset + 10;
        const data = await axios.get(`http://${IP_API}/product/list?cate${lvCate}=${idCate}&offset=${newoffset}&size=10`);

        this.setState({
            offset: newoffset,
            listData: listData.concat(data.data.data.content),
        });
    }

    renderFooter = () => {
        const { listData, totalResults } = this.state
        if (listData.length === 0 && listData.length >= totalResults) {
            return <ActivityIndicator animating={false} />;
        } else {
            return <ActivityIndicator animating={true} />;
        }
    };

    _getData = async () => {
        const { offset } = this.state;

        const lvCate = this.props.navigation.getParam('lvCate');
        const idCate = this.props.navigation.getParam('idCate');
        const title = this.props.navigation.getParam('nameCate');

        if (lvCate == 3) {
            const data = await axios.get(`http://35.240.241.27:8080/product/trend`);
            this.setState({
                listData: data.data.data,
                title,
                isLoading: false
            })
        } else if (lvCate == 4) {
            const data = await axios.get(`http://35.240.241.27:8080/product/trend`);
            this.setState({
                listData: data.data.data,
                title,
                isLoading: false
            })
        } else {
            const data = await axios.get(`http://${IP_API}/product/list?cate${lvCate}=${idCate}&offset=${offset}&size=10`);

            this.setState({
                listData: data.data.data.content,
                totalResults: data.data.data.total + ' kết quả',
                title,
                isLoading: false
            });
        }

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

    onPressHome = () => {
        this.props.navigation.navigate('Home');
    }

    onPressSearch = () => {
        this.props.navigation.navigate('Search');
    }

    _goToProductDetail = (id) => {
        this.props.navigation.navigate('ProductDetail', { id: id, screen: 'Home' });
    }


    render() {
        const { title, totalResults, isLoading } = this.state;
        if (isLoading) {
            return <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator animating={isLoading} />
                <Text>Dữ liệu đang tải, xin vui lòng chờ...</Text>
            </View>
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.tabBar}>
                            <View style={styles.back}>
                                <TouchableOpacity
                                    onPress={this.handleBackPress}
                                >
                                    <FontAwesome size={20} name={'chevron-left'} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.txtTitle}>{title}</Text>
                            <TouchableOpacity
                                style={styles.warpperBtnSearch}
                                onPress={this.onPressSearch}>
                                <Feather color='#2c3e50' size={26} name={"search"} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.warpperBtnHome}
                                onPress={this.onPressHome}
                            >
                                <MaterialCommunityIcons color='#2c3e50' size={28} name={"home-outline"} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.warpperFill}>
                        <View style={styles.nominations}>
                            <FontAwesome
                                name='caret-down'
                                size={17}
                                color='grey'
                            />
                            <Text>Đề cử</Text>
                        </View>
                        <View style={styles.respond}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{totalResults}</Text>
                        </View>
                        <View style={styles.filter}>
                            <FontAwesome
                                name='filter'
                                size={17}
                                color='grey'
                            />
                            <Text>Lọc</Text>
                        </View>
                    </View>
                    <FlatList
                        data={formatData(this.state.listData, 2)}
                        renderItem={this.renderItem}
                        numColumns={2}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={1}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
            );
        }
    }
}
ShowMoreScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: REUSE.MAIN_COLOR,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingTop: Constants.statusBarHeight
    },
    tabBar: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10

    },
    back: {
        justifyContent: 'center',
    },
    txtTitle: {
        flex: 1,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    warpperBtnSearch: {
        maxWidth: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    warpperBtnHome: {
        maxWidth: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    warpperFill: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 40,
        marginBottom: 15,
        borderColor: 'grey'

    },
    nominations: {
        flexDirection: 'row',
        borderRightWidth: 1,
        justifyContent: 'space-around',
        width: '20%',
        borderColor: "grey",
        alignItems: 'center'
    },
    filter: {
        flexDirection: 'row',
        borderLeftWidth: 1,
        width: '20%',
        justifyContent: "space-around",
        borderColor: "grey",
        alignItems: 'center'
    },
    wrapperFlashSale: {
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
        color: '#c54b6c',
        fontWeight: "bold",
        fontStyle: "italic"
    },

});
