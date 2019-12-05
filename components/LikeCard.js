import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function LikeCard(props) {
    const { data: { name, image, status }, onPressShowHeart } = props;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imgCard}>
                <Image style={styles.img}
                    source={{ uri: image }}
                    resizeMode="contain" />
            </View>
            <View style={styles.warpperTxt}>
                <Text style={styles.txtCard} numberOfLines={2}>{name}</Text>
            </View>
            <TouchableOpacity style={styles.warpperShowHeart}  onPress={onPressShowHeart} >
                <AntDesign
                    name="heart"
                    style={status == 1 ? styles.heart : { opacity: 0 }}
                />
                <View style={status == 1 ? styles.warpperOverlay : { opacity: 0 }}/>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        alignItems: "center",
        borderRadius: 5,
        margin: 4,
        backgroundColor: '#fff',
        position: 'relative',
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
        height: 100,
        justifyContent: 'center',
        alignItems: "center",
    },
    img: {
        width: "100%",
        height: "100%",
    },
    warpperTxt: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginTop: 5,
        marginBottom: 10,
        minHeight: 50,
        paddingHorizontal:5
    },
    txtCard: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25,
        
        
    },
    warpperShowHeart: {
        position:'absolute',
        top:0,
        right:0,
        width:'100%',
        height:'100%',
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    heart: {
        fontSize: 40,
        zIndex:999,
        color:'red'
    },
    warpperOverlay:{
        backgroundColor: 'black',
        position:'absolute',
        top:0,
        right:0,
        width:'100%',
        height:'100%',
        borderRadius: 5,
        opacity:0.8
    },
    }); 
