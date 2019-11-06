import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import Constants from 'expo-constants'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { CATEGORY } from "../data/listcategory";
import LikeCard from '../components/LikeCard';


export default class ChooseLikeProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'UserName',
            listcategory: CATEGORY,
            count: 0,
        };
    }

    onPressContinueBtn = async () => {
        await AsyncStorage.setItem('newUser', '0');
        this.props.navigation.navigate('Main');
    }

    onPressItem = id => {
        let { listcategory, count } = this.state;
        const foundIndex = listcategory.findIndex(category => category.id === id);
        const found = listcategory[foundIndex];
        if (found.status === 0) {
            found.status = 1;
            count++;
        } else {
            found.status = 0;
            count--;
        }
        const newListCategory = [...listcategory];
        this.setState({
            listcategory: newListCategory,
            count
        });
    }

    render() {
        const disabled = this.state.count < 3 ? true : false;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTextWrapper}>
                        <AntDesign
                            name="heart"
                            size={30}
                            color="red"
                        />
                        <Text style={styles.headerText}>
                            Hãy chọn 3 sản phẩm mà bạn ưa thích
            </Text>
                    </View>
                    <View style={styles.sloganWrapper}>
                        <Text style={styles.txtSlogan}>
                            Việc này sẻ giúp chúng tôi những sản phẩm bạn yêu tích dễ dàng hơn !
              </Text>
                    </View>

                    <View style={styles.headerButtonWrapper}>
                        <View>
                            <Button
                                disabled={disabled}
                                onPress={this.onPressContinueBtn}
                                title="Tiếp tục"
                                type="outline"
                                buttonStyle={styles.btnNext}
                                titleStyle={{ color: 'black', fontWeight: "bold", fontSize: 16 }}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.body}>
                    <View style={styles.groupListCategory}>
                        {
                            this.state.listcategory.map(item => {
                                return <LikeCard
                                    key={item.id}
                                    data={item}
                                    onPressShowHeart={() => this.onPressItem(item.id)}
                                />
                            })
                        }
                    </View>

                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
    },
    header: {
        flex: 0.28,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    headerTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
        fontSize: 18

    },
    txtSlogan: {
        marginTop: 10,
        fontSize: 16
    },
    body: {
        flex: 0.72,
    },
    headerButtonWrapper: {
        width: '90%',
        alignItems: "center",
    },
    btnNext: {
        width: 160,
        padding: 12,
        marginTop: 10,
        borderRadius: 10
    },
    groupListCategory: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around"
    }
});
