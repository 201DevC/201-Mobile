import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Button, Icon, Input } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import axios from 'axios';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    logInFb = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('547317426051487', {
                permissions: ['user_birthday', 'public_profile', 'user_gender', 'user_location'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await axios.get(`https://graph.facebook.com/me?fields=birthday,location,gender,name&access_token=${token}`);
                // format data
                const data = response.data;
                data.username = data.id + 10;
                data.gender = data.gender === 'male' ? true : false;
                data.survey = true;
                data.birthday = data.birthday.replace(/\//g, '-');
                const res = await axios.post('http://35.240.241.27:8080/user', data);
                if (res.data.header.successful) {
                    const newUser = res.data.data.survey ? '0' : '1';
                    await AsyncStorage.setItem('username', res.data.data.username);
                    await AsyncStorage.setItem('newUser', newUser);
                    this.props.navigation.navigate('AuthLoading');
                } else {
                    alert('Đăng nhập không thành công');
                }
            } else {
                // type === 'cancel'
                alert('Đăng nhập không thành công');
            }
        } catch ({ message }) {
            //   alert(`Facebook Login Error: ${message}`);
            alert('Xác thực tài khoản không thành công');
        }
    }

    logInGoogle = async () => {

    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        await AsyncStorage.setItem('newUser', '0');
        this.props.navigation.navigate('AuthLoading');
    };

    _signInAsyncNewUser = () => {
        // await AsyncStorage.setItem('userToken', 'abc');
        // await AsyncStorage.setItem('newUser', '1');
        // this.props.navigation.navigate('AuthLoading');
        this._logIn();
    };

    _signInGeneral = () => {

    }

    _signInFb = () => {
        this.logInFb();
    }

    _signInGoogle = () => {
        this.logInGoogle();
    }

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
                        onPress={this._signInFb}
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

