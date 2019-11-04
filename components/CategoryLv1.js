import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';


export default class ItemProduct extends Component {
    render() {
        const { data: {name}} = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        paddingHorizontal:15,
        paddingVertical:3,
        borderColor:'#7f8c8d',
        borderRadius:20,
        alignItems:"center",
        margin:8
    },
    text:{
        color:"#f39c12",
        fontSize:16
    }
    

}); 