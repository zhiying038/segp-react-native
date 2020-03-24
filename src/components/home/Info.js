import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeInfo from '../../data/HomeInfo';

export default class Info extends Component {
    renderItem = ({ item }) => {
        return (
            <LinearGradient
                colors={['#009245', '#8cc631']}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}}
                style={styles.item}    
            >
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.categoryContainer}>
                        <View style={styles.category}>
                            <Text style={styles.text}>{item.category}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }

    ItemSeparatorComponent = () => {
        return (
            <View style={{ height: 10 }} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flatlist}>
                    <FlatList
                        data={HomeInfo}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.category}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 10
    },
    imageContainer: {
        width: 95,
        height: 95
    },
    image: {
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: '#FFF',
        borderRadius: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingBottom: 5
    },
    flatlist: {
        flex: 1,
        marginTop: 10
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    description: {
        color: '#FFF',
        fontSize: 15,
    },
    category: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 50
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    text: {
        color: 'green',
        fontWeight: 'bold'
    }
});