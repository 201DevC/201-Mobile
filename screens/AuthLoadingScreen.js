import React from 'react';
import {
    View,
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    AsyncStorage,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const newUser = await AsyncStorage.getItem('newUser');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (userToken) {
          this.props.navigation.navigate(newUser === '1' ? 'ChooseLikeProduct' : 'Main');
        } else {
            this.props.navigation.navigate('Login');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
