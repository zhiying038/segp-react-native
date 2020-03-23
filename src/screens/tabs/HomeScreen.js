import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blue: '',
            brown: '',
            orange: '',
            total: ''
        };
        this.getData = this.getData.bind(this);
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
                blue: data.BlueRecycled,
                brown: data.BrownRecycled,
                orange: data.OrangeRecycled,
                total: data.TotalRecycled
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: '400' }}>
                        Some Interesting Information
                    </Text>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={[styles.listContainer, { backgroundColor: '#3BB9FF' }]}>
                            <Text style={styles.title}>Paper</Text>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.count}>{this.state.blue}</Text>
                                    <Text style={styles.subtitle}>Recycled</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.listContainer, { backgroundColor: '#8B4513' }]}>
                            <Text style={styles.title}>Glass</Text>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.count}>{this.state.brown}</Text>
                                    <Text style={styles.subtitle}>Recycled</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.listContainer, { backgroundColor: '#FF8C00' }]}>
                            <Text style={styles.title}>Aluminium & Cans</Text>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.count}>{this.state.orange}</Text>
                                    <Text style={styles.subtitle}>Recycled</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 18
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
    },
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    }
})