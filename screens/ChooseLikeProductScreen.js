import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import Constants from 'expo-constants'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import LikeCard from '../components/LikeCard';
import axios from 'axios';
import { REUSE } from '../reuse/Reuse';

const IP_API = REUSE.IP_API;
export default class ChooseLikeProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listcategory: [],
            count: 0,
            isLoading: true,
        };
    }

    _getDataCategoryLv1 = async () => {
        const data = await axios.get(`http://${IP_API}/category/lv1`);
        listcategory = data.data.data.content.map((item) => {
            item.status = 0;
            return item;
        });
        this.setState({ listcategory, isLoading: false });
    }

    componentDidMount() {
        this._getDataCategoryLv1();
    }

    onPressContinueBtn = async () => {
        await AsyncStorage.setItem('newUser', '0');
        const productIdSelected = this.state.listcategory.filter(item => item.status === 1).map(item => item.id);
        const username = await AsyncStorage.getItem('username');
        await axios.post(`http://${IP_API}/user/${username}/favorite`, productIdSelected);
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
        const { isLoading, listcategory, count } = this.state;
        const disabled = count < 3 ? true : false;

        return isLoading ? (<View style={styles.container}><ActivityIndicator /></View>) : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTextWrapper}>
                        <AntDesign
                            name="heart"
                            size={30}
                            color="red"
                        />
                        <Text style={styles.headerText}>
                            {`Chào bạn, hãy chọn 3 sản phẩm mà bạn ưa thích`}
                        </Text>
                    </View>
                    <View style={styles.sloganWrapper}>
                        <Text style={styles.txtSlogan}>
                            {`Việc này sẽ giúp chúng tôi tìm kiếm những sản phẩm mà bạn sẽ thích!`}
                        </Text>
                    </View>

                    <View style={styles.headerButtonWrapper}>
                        <View>
                            <Button
                                disabled={disabled}
                                onPress={this.onPressContinueBtn}
                                title="Tiếp tục"
                                type="outline"
                                raised
                                containerStyle={styles.btnNext}
                                buttonStyle={styles.btnNextOutline}
                                titleStyle={{ color: REUSE.TITTLE_COLOR, fontWeight: "500", fontSize: 16 }}
                            />
                        </View>
                    </View>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={listcategory}
                    renderItem={({ item }) => <LikeCard
                        onPressShowHeart={() => this.onPressItem(item.id)}
                        data={item}
                    />}
                    numColumns={3}
                    style={{ flex: 1 }}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: REUSE.MAIN_COLOR,
        marginTop: Constants.statusBarHeight,

    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    headerTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    headerText: {
        marginLeft: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        width: '90%',
        color:REUSE.TITTLE_COLOR
    },
    txtSlogan: {
        marginTop: 8,
        fontSize: 16,
        paddingHorizontal: 4,
        textAlign: 'center'
    },
    headerButtonWrapper: {
        width: '90%',
        alignItems: "center",
    },
    btnNext: {
        width: 160,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 8,
        
    },
    btnNextOutline: {
        borderRadius: 8
    },
    
});
