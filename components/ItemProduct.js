import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from 'react-native-elements';
import { Rating } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { FontAwesome } from '@expo/vector-icons';

export default class ItemProduct extends Component {

    render() {
        const { data: { name, shop_info, price, order_count, images, rating_info } } = this.props;
        // const new_price = item ? item.price : 0;
        const total_rated = rating_info ? rating_info.total_rated : 0;
        const percent_number = rating_info ? rating_info.percent_number : 100;
        const rating = percent_number / 100 * 5;
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.cardContainer}
            >
                <View style={styles.imgCardProduct}>

                    <Image containerStyle={styles.img}
                        source={{ uri: images[0] }}
                        resizeMode="cover"
                    />

                </View >
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
                        value={price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={''}
                        renderText={value => <Text
                            style={styles.txtOldPrice}
                            numberOfLines={1}>
                            160000 đ
                                </Text>
                        }
                    />
                </View>
                <View style={styles.warpperRateAndOrder}>
                    <View style={styles.warpperRating}>
                        <Rating readonly startingValue={rating} imageSize={10} />
                        <Text style={styles.txtOrderCount} numberOfLines={1}>({rating_info.total_rated})</Text>
                    </View>
                    <View style={styles.warpperOrderCount}>
                        <FontAwesome size={10} color='#747d8c' name={"tag"} />
                        <Text style={styles.txtOrderCount} numberOfLines={1}>{order_count}</Text>
                    </View>
                </View>

                <View style={styles.warpperShopInfoAndShip}>
                    <View style={styles.warpperShopInfo}>
                        <FontAwesome size={15} color='#ff7f50' name={"shield"} />
                        <Text style={styles.txtShopName} numberOfLines={1}>{shop_info.name}</Text>
                    </View>
                    <FontAwesome size={15} color='#2ed573' name={"truck"} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        margin: 3,
        borderRadius: 5,
        borderColor: '#ecf0f1',
        backgroundColor: '#fff',
        borderWidth: 2,
        overflow: "hidden",
        padding: 5,

    },
    imgCardProduct: {
        height: 160,
        borderRadius: 5,
        overflow: "hidden",
    },
    img: {
        width: '100%',
        height: '100%',
    },
    NameProduct: {
        minHeight: 40,
        justifyContent: 'center'
    },
    txtNameProduct: {
        color: 'black',
        flexWrap: "wrap",
        fontSize: 15,
    },
    warpperPrice: {
        minHeight: 35,
        justifyContent:'center'
    },
    txtPrice: {
        color: '#eb2f06',
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
        borderBottomWidth:0.5,
        borderColor:'#a4b0be',
        paddingBottom:3,
        marginBottom:3
    },

    txtOrderCount: {
        fontSize: 12,
        marginLeft: 3,
        color:'#747d8c'

    },
    warpperRating: {
        flexDirection: 'row',
        alignItems: 'center'

    },

    warpperOrderCount: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    warpperShopInfoAndShip: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtShopName: {
        color: 'black',
        fontSize: 12,
        marginLeft: 5,
        flex: 0.9,
        color:'#747d8c'
    },
    warpperShopInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width:'80%'
    },

}); 
