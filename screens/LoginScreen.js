import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Button, Icon, Input } from 'react-native-elements';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        await AsyncStorage.setItem('newUser', '0');
        this.props.navigation.navigate('AuthLoading');
    };

    _signInAsyncNewUser = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        await AsyncStorage.setItem('newUser', '1');
        this.props.navigation.navigate('AuthLoading');
    };

    _chooseLikeProduct = () => {
        this.props.navigation.navigate('ChooseLikeProduce');
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.logo}>SenDo</Text>
                </View>
                <View style={styles.boxBtnLogin}>
                    <Button
                        onPress={this._signInAsyncNewUser}
                        buttonStyle={[styles.btn, styles.btnFb]}
                        icon={
                            <Icon
                                name='facebook-f'
                                type='font-awesome'
                                color='#fff'
                                size={20}
                            />
                        }
                        title="Facebook"
                        titleStyle={{ color: '#fff', marginLeft: 15 }}
                        type="outline"

                    />
                    <Button buttonStyle={[styles.btn, styles.btnGg]}
                        icon={
                            <Icon
                                name='google'
                                type='font-awesome'
                                color='red'
                                size={20}
                            />
                        }
                        title='Google'
                        titleStyle={{ color: 'black', marginLeft: 15 }}
                        type="outline"
                    />
                </View>
                <View>
                    <Text>______Hoặc______</Text>
                </View>
                <View style={styles.input}>
                    <Input
                        placeholder='Tên đăng nhập'
                        leftIcon={
                            <Icon
                                name='user'
                                type='font-awesome'
                                size={24}
                                color='black'
                            />
                        }
                        leftIconContainerStyle={{ marginRight: 20 }}
                    />
                </View>
                <View style={styles.input}>
                    <Input
                        placeholder='Mật khẩu'
                        leftIcon={
                            <Icon
                                name='lock'
                                type='font-awesome'
                                size={24}
                                color='black'
                            />
                        }
                        leftIconContainerStyle={{ marginRight: 20 }}
                    />
                </View>

                <Button
                    onPress={this._signInAsync}
                    buttonStyle={styles.btnLogin}
                    title='Đăng nhập'
                    titleStyle={{ color: 'black' }}
                    type="outline"
                />
                <View style={styles.footerLogin}>
                    <TouchableOpacity>
                        <Text style={{ color: 'blue', fontSize: 15 }}>Đăng kí ngay !</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: 'red', fontSize: 15 }}>Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        justifyContent: "center",

    },
    logo: {
        fontSize: 50,
        fontWeight: '500',
        color: 'red',
        marginBottom: 40

    },
    boxBtnLogin: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-around",
        marginBottom: 20
    },
    btn: {
        width: 150
    },
    btnFb: {
        backgroundColor: 'blue',
        backgroundColor: '#3a559f'
    },
    input: {
        width: '80%',
        marginTop: 25
    },
    btnLogin: {
        width: 200,
        alignItems: "center",
        margin: 20,
        marginTop: 60
    },
    footerLogin: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around",

    }


});

