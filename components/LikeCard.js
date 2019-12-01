import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function LikeCard(props) {
    const { data: { name, image, status }, onPressShowHeart } = props;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imgCard}>
                <Image style={styles.img}
                    source={{uri: image}}
                    resizeMode="contain" />
            </View>
            <Text style={styles.txtCard} numberOfLines={2}>{name}</Text>
            <TouchableOpacity style={styles.overlayContainer} onPress={onPressShowHeart} >
                <View style={status == 1 ? styles.overlay : { opacity: 0 }}>
                    <AntDesign
                        name="heart"
                        style={styles.heart}
                    />
                    <View >
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        width: 112,
        alignItems: "center",
        borderRadius: 8,
        margin: 4,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
        justifyContent:'space-around',
    },
    imgCard: {
        width: '100%',
        height:120,
        justifyContent: 'center',
        alignItems: "center",
    },
    img: {
        width: "80%",
        height: "80%",
    },
    txtCard: {
        fontSize: 18,
        minHeight:50,
        textAlign:'center',
        lineHeight:25
    },
    overlayContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    heart: {
        color: 'red',
        fontSize: 40,
        opacity: 0.7,
    },
    overlay: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        opacity: 0.8,
        borderRadius: 8,

    }
}); 
