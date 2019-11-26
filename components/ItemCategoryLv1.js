import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";

export default class ItemCategoryLv1 extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { data: { name, image, choose } } = this.props;
        return (
            <TouchableOpacity style={choose == 0 ? styles.warpperItemCategory : styles.warpperItemCategoryChoose } onPress={this.props.onPress}>
                <Image style={styles.img}
                    source={{ uri: image }}
                    resizeMode="cover"
                />
                <View style={styles.warpperTxt}>
                    <Text style={choose == 0 ? styles.txtCategory : styles.txtCategoryChoose} numberOfLines={2}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    warpperItemCategory: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:10,
        marginVertical:2,
        backgroundColor:"#fff"
        
    },
    warpperItemCategoryChoose:{
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:10,
        marginVertical:2,
        backgroundColor:"#ffdee3",
        color:"white"
    },
    img: {
        width: 60,
        height: 60
    },
    warpperTxt:{
        width:"100%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtCategory:{
        fontSize:12,
        textAlign:"center",
        fontWeight:"bold",
        color:'black'
    },
    txtCategoryChoose:{
        fontSize:12,
        textAlign:"center",
        fontWeight:"bold",
        color:'#ff4757'
    }
}); 
