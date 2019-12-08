import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default class CategoryLv1 extends Component {
    render() {
        const { data: { name }, _onPress } = this.props;
        return (
            <TouchableOpacity
                onPress={_onPress}
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
        backgroundColor:"#ce2b2c"
    },
    text: {
        color: "#fff",
        fontSize: 15,
        fontWeight:'bold'
    }


}); 
