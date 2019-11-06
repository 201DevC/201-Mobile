import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function LikeCard(props) {
    const { data: { name, img_source, status }, onPressShowHeart } = props;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imgCard}>
                <Image style={styles.img}
                    source={img_source}
                    resizeMode="contain" />
            </View>
            <Text style={styles.txtCard}>{name}</Text>
            <TouchableOpacity style={styles.overlayContainer} onPress={onPressShowHeart} >
                <View style={status == 1 ? styles.overlay : { opacity: 0 }}>
                    <AntDesign
                        name="heart"
                        style={styles.heart}
                    />
                    <View >
                    </View>
                </View>
                {/* <View style={styles.overlay}></View> */}
                {/* { status == 1 && <AntDesign
                        name="heart"
                        style={styles.heart}
                    /> }
                    { status == 1 && <Text>show</Text>} */}
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        width: 112,
        height: 140,
        alignItems: "center",
        borderRadius: 10,
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

    },
    imgCard: {
        width: '100%',
        flex: 0.8,
        justifyContent: 'center',
        alignItems: "center",
    },
    img: {
        width: "80%",
        height: "80%",

    },
    txtCard: {
        fontSize: 18,
        flex: 0.2
    },
    overlayContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    // overlayContainerBefore:{
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     width: '100%',
    //     height: '100%',
    //     alignItems: "center",
    //     justifyContent: "center",
    //     opacity:0.7
    // },
    heart: {
        color: 'red',
        fontSize: 40,
        opacity: 0.7,
    },
    overlay: {
        // position: 'absolute',
        // left: 0,
        // top: 0,
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        opacity: 0.7,
        // borderRadius:10
    }
}); 
