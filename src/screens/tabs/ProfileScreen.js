import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullname: '',
        };
        this.getData = this.getData.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('userToken');
        axios.get('http://157.245.205.223:8000/student', {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {
            const data = response.data;
            this.setState({
                fullname: data.StudentName,
                email: data.Email
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    signOut = async () => {
        await AsyncStorage.clear();
        alert("You have signed out!");
        this.props.navigation.navigate("Auth");
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Entypo name="info-with-circle" size={24} />

                        <TouchableOpacity onPress={this.signOut}>
                            <AntDesign name="logout" size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userinfo}>
                        <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>Name: {this.state.fullname}</Text>
                        <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>Email: {this.state.email}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginHorizontal: 16
    },
    userinfo: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 16
    }
});