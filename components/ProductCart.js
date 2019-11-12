import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Card, Rating } from 'react-native-elements';

export default function ProductCard(props) {
    const { width, item: { name, uri, product, rating }, onPress } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                // shadowColor: "#fff",
                // shadowOffset: {
                //     width: 0,
                //     height: 12,
                // },
                // shadowOpacity: 0.58,
                // shadowRadius: 16.00,

                // elevation: 24,
                // borderRadius: 24,
            }}
        >
            <Card
                image={{ uri: uri }}
                width={width}
                imageProps={{ resizeMode: 'cover' }}
                imageStyle={{ maxWidth: width, height: width * 0.9 }}
            >
                <View>
                    <View >
                        <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>{name}</Text>
                    </View>
                    <View >
                        <Text style={{ fontWeight: 'bold', color: '#f1797a' }} numberOfLines={1}>300.000.000 đ</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#cdc6c6', fontSize: 10 }} numberOfLines={1}>{product}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' }}>
                        <Rating readonly startingValue={rating} imageSize={18} />
                        <Text style={{ fontSize: 14, marginLeft: 4 }}>(90)</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
}
