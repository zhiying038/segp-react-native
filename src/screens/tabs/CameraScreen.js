import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const flashOrder = {
    off: 'on',
    on: 'auto',
    auto: 'off'
};

const flashIcons = {
    off: 'flash-off',
    on: 'flash-on',
    auto: 'flash-auto'
};

export default class CameraScreen extends Component {
    state = {
        image: null,
        hasPermission: null,
        type: Camera.Constants.Type.back,
        flash: 'off'
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    toggleFlash = () => {
        this.setState({
            flash: flashOrder[this.state.flash]
        });
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

    renderNoPermission = () => {
        return (
            <View style={styles.noPermission}>
                <Text style={{ color: 'white' }}>
                    Camera permissions not granted.
                </Text>
            </View>
        );
    }

    renderTopbar = () => {
        return (
            <View style={styles.topbar}>
                <TouchableOpacity style={styles.button} onPress={this.toggleFlash}>
                    <MaterialIcons name={flashIcons[this.state.flash]} size={32} color="#FFF" />
                </TouchableOpacity>
            </View>
        )
    }

    renderBottomBar = () => {
        return (
            <View style={styles.bottombar}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this.capturePicture} style={{ alignSelf: 'center' }}>
                        <Ionicons name="ios-radio-button-on" size={70} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderCamera = () => {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => {this.camera = ref}}
                    style={styles.camera}
                    type={this.state.type}
                    flashMode={this.state.flash}
                >
                    {this.renderTopbar()}
                    {this.renderBottomBar()}
                </Camera>
            </View>
        )
    }

    render() {
        const screenContent = this.state.hasPermission ? this.renderCamera() : this.renderNoPermission();
        return (
            <View style={styles.container}>
                {screenContent}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    topbar: {
        flex: 0.2,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: Constants.statusBarHeight / 2
    },
    button: {
        flex: 0.25,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noPermission: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottombar: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        flex: 0.12, 
        flexDirection: 'row'
    }
});