import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage, Image } from 'react-native';
import axios from 'axios';

export default class Recycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recycle: ""
        };
        this.housesData = this.housesData.bind(this);
    }

    componentDidMount() {
        this.housesData();
    }

    housesData = async () => {
        const token = await AsyncStorage.getItem('userToken');
        axios.get('http://157.245.205.223:8000/leaderboards', {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {
            const data = response.data;
            this.setState({
                recycle: data.Recycables
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Image
                    source={
                        item.Name === "Plastic" 
                        ? require("../../../assets/plastic_2.png") 
                        : item.Name === "Paper"
                        ? require("../../../assets/paper_2.png")
                        : require("../../../assets/water_2.png")
                    }
                    resizeMode="cover"
                    style={styles.image}
                />
                <Text style={styles.name}>{item.Name}</Text>
                <Text style={styles.value}>{item.TotalRecycled}</Text>
            </View>
        )
    }

    ItemSeparatorComponent = () => {
        return (
            <View style={{ height: 30 }} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.recycle}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#FFF',
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    name: {
        color: 'green',
        fontWeight: '700',
        fontSize: 25
    },
    value: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'green'
    }
})