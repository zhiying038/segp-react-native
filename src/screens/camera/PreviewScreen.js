import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const window = Dimensions.get('window').width;

export default class PreviewScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            image: ''
        };
    }

    handleRecycle = async () => {
        const token = await AsyncStorage.getItem('userToken');
        axios.post('http://157.245.205.223:8000/recycle', {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
    }

    render() {
        const { navigation } = this.props;
        const uri = navigation.getParam('photo');
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.upload}>
                    <AntDesign name="upload" size={24} color="#FFF" />
                </TouchableOpacity>

                <Image style={styles.image} source={{ uri: uri }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    image: {
        width: window,
        height: 350
    },
    back: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upload: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 32,
        height: 32,
    }
});