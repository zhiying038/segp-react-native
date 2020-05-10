/* 
Code written by group 7A

Libraries are:
- @expo/vector-icons
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class AboutModal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.close} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: 20, width: 300 }}>
                    An initiative taken by a group of students from University of Nottingham Malaysia
                    to raise the awareness of the importance of recycling to the youngsters.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    close: {
        position: 'absolute',
        top: 64,
        right: 32
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})