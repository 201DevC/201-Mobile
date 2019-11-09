import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default class ItemProduct extends Component {

    render() {
        const { data: { name, shop_name, price, order_count, images } } = this.props;
        // console.log(images[0])
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.cardContainer}
            >
                <View style={styles.imgCardProduct}>
                    <Image style={styles.img}
                        source={{uri: 'https://media3.scdn.vn/img1/2015/7_5/1ed1a0_simg_de2fe0_500x500_maxb.jpg'}}
                        resizeMode="cover" />
                </View >
                <View style={styles.warpperProductResponse}>
                    <View style={styles.NameProduct}>
                        <Text style={styles.txtNameProduct} numberOfLines={2}>{name}</Text>
                    </View>
                    <View style={styles.OrderCount}>
                        <Text style={styles.txtOrderCount}>({order_count})</Text>
                    </View>
                </View>
                <View style={styles.warpperProductResponse}>
                    <View style={styles.ShopName}>
                        <Text style={styles.txtShopName}>{shop_name}</Text>
                    </View>
                    <View style={styles.Price}>
                        <Text style={styles.txtPrice}>{price} vnđ</Text>
                    </View>


                </View>

            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        width: 150,
        height: 180,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ecf0f1',
        backgroundColor: '#fff',
        borderWidth: 2,

    },
    imgCardProduct: {
        flex: 0.6,

    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    warpperProductResponse: {
        flex: 0.2,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 5,
        alignItems: "center",
    },
    NameProduct: {
        flex: 0.7,

    },
    txtNameProduct: {
        color: 'black',
        fontWeight: "bold",
        flexWrap: "wrap",
        fontSize: 16
    },
    OrderCount: {
        flex: 0.3,
        alignItems: "flex-end"
    },
    ShopName: {
        flex: 0.4
    },
    txtShopName: {
        color: '#95a5a6',
        fontSize: 14,
        flexWrap: "wrap",
    },
    Price: {
        flex: 0.6,
        alignItems: "flex-end"
    },
    txtPrice: {
        color: '#d35400',
        fontSize: 14,
        fontWeight: "bold",
    }




}); 
