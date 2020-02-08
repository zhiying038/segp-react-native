import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignSelf: 'center'}}>
                        <View style={styles.profileImage}>
                            <Image source={require('../../assets/profile-placeholder.png')} style={styles.image} resizeMode="center"></Image>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, {fontWeight: '200', fontSize: 25}]}>Jane ABC</Text>
                        <Text style={[styles.text, {color: '#AEB5BC', fontSize: 18}]}>Student</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, {fontSize: 20}]}>10</Text>
                            <Text style={[styles.text, styles.subtext]}>Items Recycled</Text>
                        </View>
                        <View style={styles.statsBox, {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1, paddingRight: 10, paddingLeft: 10}}>
                            <Text style={[styles.text, {fontSize: 20}]}>50</Text>
                            <Text style={[styles.text, styles.subtext]}>Points</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, {fontSize: 20}]}>1</Text>
                            <Text style={[styles.text, styles.subtext]}>Rank</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 50}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.imageContainer}>
                                <Image source={require("../../assets/plastic-bottle.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image source={require("../../assets/coke.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profileImage: {
        width: 180,
        height: 200,
        borderRadius: 200,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    text: {
        color: '#52575D',
        textAlign: 'center'
    },
    subtext: {
        fontSize: 14,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    infoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 50,
    },
    statsBox: {
        alignSelf: 'center',
        flex: 1
    },
    imageContainer: {
        width: 160,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 15
    },
})