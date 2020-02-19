import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class AboutScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.about}>
                        This is a Go Green Initiative to educate students to be 
                        more environmentally conscious.
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    about: {
        fontSize: 23,
        textAlign: 'center',
        margin: 10
    }
})