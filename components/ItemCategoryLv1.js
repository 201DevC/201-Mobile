import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { REUSE } from '../reuse/Reuse';

export default class ItemCategoryLv1 extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { data: { name, image, choose } } = this.props;
        return (
            <TouchableOpacity style={choose == 0 ? styles.wrapperItemCategory : styles.wrapperItemCategoryChoose } onPress={this.props.onPress}>
                <Image style={styles.img}
                    source={{ uri: image }}
                    resizeMode="cover"
                />
                <View style={styles.wrapperTxt}>
                    <Text style={choose == 0 ? styles.txtCategory : styles.txtCategoryChoose} numberOfLines={2}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapperItemCategory: {
        width: "100%",
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:10,
        marginVertical:2,
        backgroundColor:'#ce2b2c',
    },
    wrapperItemCategoryChoose:{
        width: "100%",
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:10,
        marginVertical:2,
        backgroundColor:REUSE.MAIN_COLOR,
        color:"white"
    },
    img: {
        width: 60,
        height: 60
    },
    wrapperTxt:{
        width:"100%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtCategory:{
        fontSize:14,
        textAlign:"center",
        fontWeight:"bold",
        color:'#fff'
    },
    txtCategoryChoose:{
        fontSize:14,
        textAlign:"center",
        fontWeight:"bold",
        color:'#e10100'
    }
}); 
