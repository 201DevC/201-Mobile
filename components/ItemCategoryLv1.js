import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";

export default class ItemCategoryLv1 extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { data: { name, image } } = this.props;
        return (
            <TouchableOpacity style={[styles.warpperItemCategory, {...this.props.pressStyles}]} onPress={this.props.onPress}>
                <Image style={styles.img}
                    source={{ uri: image }}
                    resizeMode="cover"
                />
                <View style={styles.warpperTxt}>
                    <Text style={styles.txtCategory}>{name}</Text>
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
        borderWidth:0.5,
        borderColor:"grey",
        backgroundColor:"#fff"
        
    },
    img: {
        width: 40,
        height: 40
    },
    warpperTxt:{
        width:"100%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtCategory:{
        fontSize:12,
        textAlign:"center",
        fontWeight:"bold"
    }
}); 
