import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, Image } from 'react-native';
import axios from 'axios';

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: ""
        }
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

    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
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
                    <Text>Total Recycled: {item.TotalRecycled}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[...this.state.students].sort((a,b) => {
                        const aScore = a.TotalRecycled;
                        const bScore = b.TotalRecycled;
                        return bScore - aScore;
                    })}
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
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})