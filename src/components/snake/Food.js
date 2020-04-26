import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class Food extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            // <View style={{ width: this.props.size, height: this.props.size, backgroundColor: 'green', position: 'absolute', left: x*this.props.size, top: y*this.props.size }} />
            <Image
                source={require("./images/recycle.jpg")}
                style={{
                    position: 'absolute',
                    width: this.props.size,
                    height: this.props.size,
                    left: x * this.props.size,
                    top: y * this.props.size
                }}
                resizeMode="stretch"
            />
        )
    }
}