import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView, ImageBackground, Dimensions } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Info from '../../components/home/Info';

const width = Dimensions.get('screen').width;

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        source={require('../../../assets/homeHeader.png')}
                        style={styles.imageBackground}
                        resizeMode="contain"
                    >
                        <Text style={styles.title}>HOME</Text>
                    </ImageBackground>
                </View>

                <View style={styles.tabBar}>
                    <ScrollableTabView
                        initialPage={0}
                        tabBarActiveTextColor="green"
                        renderTabBar={() => (
                            <DefaultTabBar underlineStyle={{ backgroundColor: 'green'}} />
                        )}
                    >
                        <Info tabLabel="Fun Facts" props={this.props} />
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: 15.5,
        position: 'absolute'
    },
    imageBackground: {
        width: width * 0.4,
        height: width * 0.4,
        alignItems: 'center'
    },
    title: {
        color: '#FFF',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 25,
        marginRight: 20
    },
    tabBar: {
        flex: 1,
        marginTop: width * 0.3,
        paddingHorizontal: 30
    }
});