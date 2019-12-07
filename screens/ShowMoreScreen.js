import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    BackHandler,
    AsyncStorage,
    Dimensions
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import ItemProduct from '../components/ItemProduct';
import Constants from 'expo-constants';
import axios from "axios";
import { REUSE } from '../reuse/Reuse';

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
            offset: 0,
            // totalResults: '',
            isLoading: true,
            isLoadingFooter: true
        };
        this._isMounted = false;
        this.backHandler = null;
    }

    renderItem = ({ item }) => {
        if (item.emty === true) {
            return <View style={{ flex: 1, margin: 3, padding: 5, }} />;
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
        const { offset, listData } = this.state;
        const lvCate = this.props.navigation.getParam('lvCate');
        const idCate = this.props.navigation.getParam('idCate');
        const newoffset = offset + 20;
        if (lvCate == 3) {
            const data = await axios.get(`http://${IP_API}/flash?offset=${newoffset}&size=20`);
            this.setState({
                offset: newoffset,
                listData: listData.concat(data.data.data.content),
            });
        } else if (lvCate == 2 || lvCate == 1) {
            const data = await axios.get(`http://${IP_API}/product/list?cate${lvCate}=${idCate}&offset=${newoffset}&size=10`);
            this.setState({
                offset: newoffset,
                listData: listData.concat(data.data.data.content),
            });
        } else this.setState({
            isLoadingFooter: false
        })
    }

    renderFooter = () => {
        const { listData, isLoadingFooter } = this.state
        // if (listData.length === 0 && listData.length >= totalResults) {
        // if (listData.length > 0) {

        // }

        return <ActivityIndicator animating={isLoadingFooter} />;
        // } else {
        //     return <ActivityIndicator animating={true} />;
        // }
    };

    _getData = async () => {
        const { offset } = this.state;
        const lvCate = this.props.navigation.getParam('lvCate');
        const idCate = this.props.navigation.getParam('idCate');
        const title = this.props.navigation.getParam('nameCate');
        if (lvCate == 3) {
            // const data = await axios.get(`http://35.240.241.27:8080/product/trend`);
            const data = await axios.get(`http://${IP_API}/flash?offset=${offset}&size=20`);
            const listData = data.data.data.content.filter(item => item !== null);
            this.setState({
                listData,
                title,
                isLoading: false
            })
        } else if (lvCate == 4) {
            const username = await AsyncStorage.getItem('username');
            const data = await axios.get(`http://${IP_API}/product/recommend`, {
                params: {
                    userId: username,
                }
            });
            const listData = data.data.data.filter(item => item !== null);
            return this.setState({
                listData,
                title,
                isLoading: false

            });
        } else {
            const data = await axios.get(`http://${IP_API}/product/list?cate${lvCate}=${idCate}&offset=${offset}&size=20`);
            const listData = data.data.data.content.filter(item => item !== null);

            this.setState({
                listData,
                // totalResults: data.data.data.total + ' kết quả',
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
        this.props.navigation.navigate('ProductDetail', { id: id});
    }


    render() {
        const { title, isLoading } = this.state;
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
                    {/* <View style={styles.warpperFill}>
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
                    </View> */}
                    <FlatList
                        data={formatData(this.state.listData, 2)}
                        renderItem={this.renderItem}
                        numColumns={2}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={1}
                        ListFooterComponent={this.renderFooter}
                        showsVerticalScrollIndicator={false}
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
        flex: 1,
        backgroundColor: REUSE.MAIN_COLOR,
    },
    header: {
        backgroundColor: REUSE.TABBAR_COLOR,
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
