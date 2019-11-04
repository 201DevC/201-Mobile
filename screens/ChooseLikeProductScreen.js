import React, { Component } from 'react';
import { View, StyleSheet, Button, AsyncStorage } from 'react-native';

export default class ChooseLikeProductScreen extends Component {
    static navigationOptions = {
        title: 'Choose like',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="dashboard" onPress={this._signInAsync} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('AuthLoading');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
