import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, AsyncStorage, Picker, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const window = Dimensions.get('window').width;

export default class PreviewScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            prediction: '',
            category: '',
            upload: false,
            errorMessage: ''
        };
        this.handlePrediction = this.handlePrediction.bind(this);
        this.handleUserchoice = this.handleUserchoice.bind(this);
        this.validateUserchoice = this.validateUserchoice.bind(this);
    }

    handlePrediction = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const imageUrl = this.props.navigation.getParam('base64Img');
        this.setState({
            image: imageUrl,
        });

        axios.post('http://157.245.205.223:8000/predict', {
            recycable_image: this.state.image
        }, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {
            const data = response.data;
            this.setState({
                prediction: data.prediction
            });
            alert(`Uploaded Successfully.\nIt is ${this.state.prediction}.\nPlease choose the recycle option.`);
            this.setState({
                upload: !this.state.upload
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleUserchoice = async () => {
        const token = await AsyncStorage.getItem('userToken');
        axios.post('http://157.245.205.223:8000/recycle', {
            timeout: 60000,
            recyclable: this.state.category
        }, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            alert(`Your choice ${this.state.category} has been sent.`);
        })
        .catch(error => {
            console.log(error);
        })
    }

    validateUserchoice = () => {
        if (this.state.category === "") {
            this.setState({
                errorMessage: "Please select an option from the dropdown menu."
            });
        } else {
            this.handleUserchoice();
        }
    }

    render() {
        const { navigation } = this.props;
        const uri = navigation.getParam('photo');
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#000" />
                </TouchableOpacity>

                {
                    !this.state.upload 
                    ? (<TouchableOpacity style={styles.upload} onPress={this.handlePrediction}>
                            <AntDesign name="upload" size={24} color="#000" />
                        </TouchableOpacity>) 
                    : (<TouchableOpacity style={styles.upload} onPress={this.validateUserchoice}>
                            <Ionicons name="ios-send" size={24} color="#000" />
                        </TouchableOpacity>)
                }

                <View style={styles.errorMessage}>
                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                </View>

                {this.state.upload && 
                    <Picker
                        style={{ height: 100, width: 180, top: -100 }}
                        selectedValue={this.state.category}
                        onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
                    >
                        <Picker.Item label="Options" />
                        <Picker.Item label="Paper" value="Paper" />
                        <Picker.Item label="Glass" value="Glass" />
                        <Picker.Item label="Aluminium & Cans" value="Aluminium" />
                    </Picker>
                }

                <Image style={styles.image} source={{ uri: uri }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    image: {
        width: window,
        height: 350,
        top: -50
    },
    back: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upload: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 32,
        height: 32,
    },
    error: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        color: 'red'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        top: -50
    }
});