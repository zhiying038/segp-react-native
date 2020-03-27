import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class CameraScreen extends Component {
    state = {
        image: null,
        permission: false
    }

    async componentDidMount() {
        const permission = await Permissions.getAsync(Permissions.CAMERA);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.getAsync(Permissions.CAMERA);
            if (newPermission.status === 'granted') {
                this.setState({ permission: true });
            }
        } else {
            this.setState({ permission: true });
        }
    }

    capturePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync()
            .then((image) => {
                console.log(image);
                this.props.navigation.navigate("PreviewScreen", { uri: image.uri })
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Camera</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});