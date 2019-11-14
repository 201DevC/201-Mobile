import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Card, Rating } from 'react-native-elements';
import NumberFormat from 'react-number-format';

export default function ProductCard(props) {
    const { width, item, onPress } = props;
    const new_price = item ? item.price : 0;
    const total_rated = item.rating_info ? item.rating_info.total_rated : 5;
    const rating = total_rated / 100 * 5;
    const shop_name = item.shop_info.name;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ marginBottom: 4 }}
        >
            <Card
                image={{ uri: item.images[0] }}
                width={width}
                imageProps={{ resizeMode: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                imageStyle={{ maxWidth: width, height: width * 0.9 }}
                containerStyle={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
                    borderRadius: 8,
                }}
            >
                <View>
                    <View >
                        <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>{item.name}</Text>
                    </View>
                    <View >
                        <NumberFormat
                            value={new_price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={''}
                            renderText={
                                value => <Text
                                    style={{ fontWeight: 'bold', color: '#f1797a' }}
                                    numberOfLines={1}>
                                    {value} đ
                                    </Text>
                            }
                        />
                    </View>
                    <View>
                        <Text style={{ color: '#cdc6c6', fontSize: 10 }} numberOfLines={1}>{shop_name}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' }}>
                        <Rating readonly startingValue={rating} imageSize={18} />
                        <Text style={{ fontSize: 14, marginLeft: 4 }}>({total_rated})</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
}
