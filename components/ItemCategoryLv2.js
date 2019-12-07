import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";

export default class ItemCategoryLv2 extends Component {

    render() {
        const { data: { name, image } } = this.props;
        return (
            <TouchableOpacity
                style={styles.warpperItemCategory}
                onPress={this.props.onPress}
            >
                <View style={styles.warpperImage}>
                    <Image style={styles.img}
                        source={{ uri: image == null ? "http://xemanhdep.com/wp-content/uploads/2016/04/hinh-anh-girl-xinh-dep-nhat-2016-10.jpg" : image}}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.warpperTxt}>
                    <Text style={styles.txtCategory} numberOfLines={2}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    warpperItemCategory: {
        flex: 1,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
        marginVertical: 2,
        marginHorizontal: 2,
        backgroundColor: "#ffdee3"

    },
    warpperImage: {
        flex: 0.6,
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    warpperTxt: {
        flex: 0.4,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtCategory: {
        fontSize: 12,
        textAlign: "center",
        color: "black",
        fontWeight: 'bold'
    }
}); 
