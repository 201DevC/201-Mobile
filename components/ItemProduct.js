import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from 'react-native-elements';
import { Rating } from 'react-native-elements';
import NumberFormat from 'react-number-format';

export default class ItemProduct extends Component {

    render() {
        const { data: { name, shop_info, price, order_count, images, rating_info } } = this.props;
        // const new_price = item ? item.price : 0;
        const total_rated = rating_info ? rating_info.total_rated : 0;
        const percent_number = rating_info ? rating_info.percent_number : 100;
        const rating =  percent_number/100*5;
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.cardContainer}
            >
                <View style={styles.imgCardProduct}>

                    <Image style={styles.img}
                        source={{ uri: images[0] }}
                        resizeMode="cover"
                    />

                </View >
                <View style={styles.warpperNameAndPrice}>
                    <View style={styles.NameProduct}>
                        <Text style={styles.txtNameProduct} numberOfLines={1}>{name}</Text>
                    </View>
                    <View style={styles.Price}>
                        <NumberFormat
                            value={price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={''}
                            renderText={value => <Text
                                style={styles.txtPrice}
                                numberOfLines={1}>
                                {value} vnd
                                </Text>
                            }
                        />

                    </View>
                </View>
                <View style={styles.warpperRateAndOrder}>
                    <View style={styles.ShopName}>
                        <Text style={styles.txtShopName} numberOfLines={1}>{shop_info.name}</Text>
                    </View>

                    <View style={styles.OrderCount} >
                        <Rating readonly startingValue={rating} imageSize={10} />
                        <Text style={styles.txtOrderCount} numberOfLines={1}>({order_count})</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
        borderColor: '#ecf0f1',
        backgroundColor: '#fff',
        borderWidth: 2,
        overflow:"hidden"

    },
    imgCardProduct: {
        flex: 0.65,
        borderRadius: 10
    },
    img: {
        width: '100%',
        height: '100%',
    },
    warpperNameAndPrice: {
        flex: 0.2,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        borderColor: "grey",
        paddingVertical: 5
    },
    NameProduct: {
        flex: 1,
        marginBottom: 10
    },
    txtNameProduct: {
        color: 'black',
        fontWeight: "bold",
        flexWrap: "wrap",
        fontSize: 16
    },
    Price: {
        flex: 1,
        alignItems: "flex-end",
        paddingVertical: 10
    },
    txtPrice: {
        color: '#d35400',
        fontSize: 14,
        fontWeight: "bold",
    },
    warpperRateAndOrder: {
        flexDirection: "row",
        flex: 0.15,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent:"space-between",
    },
    OrderCount: {
        flex: 0.5,
        alignItems: "flex-end",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        overflow:"hidden"
    },
    txtOrderCount: {
        fontSize: 12
    },
    ShopName: {
        flex: 0.45,
    },
    txtShopName: {
        color: '#95a5a6',
        fontSize: 14,
        flexWrap: "wrap",
    },

}); 
