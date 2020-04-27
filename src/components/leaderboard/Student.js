import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, Image } from 'react-native';
import axios from 'axios';

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: "",
        };
        this.housesData = this.housesData.bind(this);
    }

    componentDidMount() {
        this.housesData();
    }

    componentDidUpdate() {
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
                students: data.Students
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    ItemSeparatorComponent = () => {
        return (
            <View style={{ height: 5, borderBottomWidth: 1, borderBottomColor: 'black' }} />
        );
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Image
                    source=
                    {
                        index + 1 === 1 
                        ? require("../../../assets/leaderboard/gold.png")
                        : index + 1 === 2
                        ? require("../../../assets/leaderboard/silver.png")
                        : index + 1 === 3
                        ? require("../../../assets/leaderboard/bronze.png")
                        : require("../../../assets/leaderboard/badge.png")
                    }
                    style={styles.medal}
                />

                <View style={styles.imageContainer}>
                    <Image
                        source={
                            item.Avatar === null
                                ? require("../../../assets/avatarPlaceholder.jpg")
                                : {uri: `data:image/jpg;base64,${item.Avatar}`}
                        }
                        style={styles.image}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.name}>{item.StudentName}</Text>
                    <Text>Total Recycled: {item.BlueRecycled+item.OrangeRecycled+item.BrownRecycled}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { students } = this.state;

        return (
            <View style={styles.container}>
                <FlatList
                    data={[...students].sort((a,b) => {
                        const aScore = a.BlueRecycled + a.OrangeRecycled + a.BrownRecycled;
                        const bScore = b.BlueRecycled + b.OrangeRecycled + b.BrownRecycled;
                        return bScore - aScore;
                    }).slice(0,10)}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 40
    },
    item: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    imageContainer: {
        width: 80,
        height: 80,
        marginLeft: 15
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginLeft: 15
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    medal: {
        width: 30,
        height: 30,
    }
})