import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Rating } from 'react-native-elements';
import NumberFormat from 'react-number-format';


export default class CardHistory extends Component {
    render() {
        const { data: { name, price, order_count, images }, _onPress, _onPressDeleteBtn } = this.props;
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
                    <Text style={styles.txtName} numberOfLines={2}>{name}</Text>
                    <View style={styles.OrderCount} >
                        <Rating readonly startingValue={3} imageSize={15} />
                        <Text style={{ marginLeft: 10 }} numberOfLines={1}>({order_count})</Text>
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
                            } />
                        <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={_onPressDeleteBtn}
                        >
                            <Text style={{ fontSize: 14, color: '#ff4757', fontWeight: 'bold' }}>Xóa</Text>
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
        paddingRight: 10,
        borderColor: '#7f8c8d',
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: 'row',
        height: 125,
        justifyContent: 'space-between',
        margin: 10,
        borderColor: '#dfe4ea'

    },
    warpperImg: {
        height: '100%',
        width: '30%',
        padding: 5,

    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    warpperContent: {
        height: '100%',
        width: '70%',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 10

    },
    txtName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    OrderCount: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    warpperPrice: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtPrice: {
        fontSize: 16,
        color: '#ff4757',
        fontWeight: 'bold'
    },
    btnDelete: {
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 3,
        borderRadius: 5,
        borderColor: '#dfe4ea'
    },



}); 
