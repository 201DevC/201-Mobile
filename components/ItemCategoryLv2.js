import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";

export default class ItemCategoryLv2 extends Component {

    render() {
        const { data: { name, image } } = this.props;
        return (
            <TouchableOpacity style={styles.warpperItemCategory}>
                <Image style={styles.img}
                    source={{ uri: "http://xemanhdep.com/wp-content/uploads/2016/04/hinh-anh-girl-xinh-dep-nhat-2016-10.jpg" }}
                    resizeMode="cover"
                />
                <View style={styles.warpperTxt}>
                    <Text style={styles.txtCategory} numberOfLines={2}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    warpperItemCategory: {
        flex:1,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:10,
        marginVertical:2,
        borderWidth:0.5,
        borderColor:"grey",
        marginHorizontal:2,
        backgroundColor:"black"
        
    },
    img: {
        width: 40,
        height: 40,
        // borderRadius:40
    },
    warpperTxt:{
        width:"100%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtCategory:{
        fontSize:12,
        textAlign:"center",
        color:"#fff"
    }
}); 
