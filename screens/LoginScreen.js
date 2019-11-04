import React, { Component } from 'react';
import { View, StyleSheet, Button, AsyncStorage } from 'react-native';

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in!" onPress={this._signInAsync} />
                <Button title="Choose like produce" onPress={this._chooseLikeProduct} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('AuthLoading');
    };

    _chooseLikeProduct = () => {
        this.props.navigation.navigate('ChooseLikeProduce');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

