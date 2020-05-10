/* 
Code written by group 7A
*/

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
            <Image
                source={require("./images/bag.png")}
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