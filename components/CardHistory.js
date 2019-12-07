import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Rating } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { FontAwesome } from '@expo/vector-icons';


export default class CardHistory extends Component {
    render() {
        // const { data: { name, price, order_count, images, price_max }, _onPress, _onPressDeleteBtn } = this.props;
        const { data: { name, shop_info, price, order_count, images, rating_info, price_max }, _onPress, _onPressDeleteBtn } = this.props;
        const percent_number = rating_info ? rating_info.percent_number : 100;
        const rating = percent_number / 100 * 5;
        return (
            <View
                style={styles.container}>
                <TouchableOpacity
                    onPress={_onPress}
                    style={styles.warpperImg}>
                    <Image
                        style={styles.img}
                        source={{ uri: images[0] }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <View style={styles.warpperContent}>
                    <View style={styles.NameProduct}>
                        <Text style={styles.txtNameProduct} numberOfLines={2}>{name}</Text>
                    </View>
                    <View style={styles.warpperPrice}>
                        <NumberFormat
                            value={price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={''}
                            renderText={value => <Text
                                style={styles.txtPrice}
                                numberOfLines={1}>
                                {value} đ
                                </Text>
                            }
                        />
                        <NumberFormat
                            value={price_max}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={''}
                            renderText={value => <Text
                                style={price_max == 0 || price_max == price ? styles.none : styles.txtOldPrice}
                                numberOfLines={1}>
                                {value} đ
                                </Text>
                            }
                        />
                    </View>
                    <View style={styles.warpperRateAndOrder}>
                        <View style={styles.warpperRating}>
                            <Rating readonly startingValue={rating} imageSize={10} type='custom' ratingColor='#e10100' />
                            <Text style={styles.txtOrderCount} numberOfLines={1}>({rating_info.total_rated})</Text>
                        </View>
                        <View style={order_count != 0 ? styles.warpperOrderCount : styles.none}>
                            <FontAwesome size={10} color='#747d8c' name={"tag"} />
                            <Text style={styles.txtOrderCount} numberOfLines={1}>{order_count}</Text>
                        </View>
                    </View>
                    <View style={styles.warpperShopInfoAndBtn}>
                        <View style={styles.warpperShopInfo}>
                            <Image style={{ width: 30, height: 15 }} source={require('../assets/images/check.png')} resizeMode="contain" />
                            <Text style={styles.txtShopName} numberOfLines={1}>{shop_info.name}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={_onPressDeleteBtn}
                        >
                            <Text style={{ fontSize: 14, color: '#e10100', fontWeight: 'bold' }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#7f8c8d',
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginBottom:5,
        borderColor: '#dfe4ea',
        padding: 5,
        flex: 1,
    },
    warpperImg: {
        width: '30%',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    warpperContent: {
        width: '68%',
        height: '100%',
        justifyContent: 'space-between',
    },
    NameProduct: {
        minHeight: 48,
        justifyContent: 'center',
    },
    txtNameProduct: {
        color: 'black',
        flexWrap: "wrap",
        fontSize: 15,
    },
    OrderCount: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    warpperPrice: {
        minHeight: 35,
        justifyContent: 'center',
    },
    txtPrice: {
        color: '#e10100',
        fontSize: 14,
    },
    txtOldPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 12,
        color: '#a4b0be'
    },
    warpperRateAndOrder: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderColor: '#a4b0be',
        paddingBottom: 3,
        marginBottom: 3
    },

    txtOrderCount: {
        fontSize: 12,
        marginLeft: 3,
        color: '#747d8c'

    },
    warpperRating: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    warpperOrderCount: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    warpperShopInfoAndBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtShopName: {
        color: 'black',
        fontSize: 12,
        marginLeft: 3,
        flex: 0.9,
        color: '#747d8c'
    },
    warpperShopInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '70%'
    },
    btnDelete: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#dfe4ea',
        width:'28%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5
    },
    none: {
        display: 'none'
    }
}); 
