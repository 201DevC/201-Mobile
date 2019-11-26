import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';


export default class CategoryLv1 extends Component {
    render() {
        const { data: { name } } = this.props;
        return (
            <TouchableOpacity
                style={styles.container}>
                <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
        backgroundColor:"#fff"
    },
    text: {
        color: "#c47482",
        fontSize: 15,
        fontWeight:'bold'
    }


}); 
