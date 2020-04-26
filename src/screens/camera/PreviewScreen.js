import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, AsyncStorage, Picker, Text, ActivityIndicator } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const window = Dimensions.get('window').width;

export default class PreviewScreen extends Component {
    _isMounted = false;

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
            errorMessage: '',
            isLoading: false
        };
        this.handlePrediction = this.handlePrediction.bind(this);
        this.handleUserchoice = this.handleUserchoice.bind(this);
        this.validateUserchoice = this.validateUserchoice.bind(this);
    }

    async componentDIdMount() {
        this._isMounted = true;
        await this.handleUserchoice();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handlePrediction = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const imageUrl = this.props.navigation.getParam('base64Img');
        this.setState({
            image: imageUrl,
            isLoading: true
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
                upload: !this.state.upload,
                isLoading: false
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({
                isLoading: false
            });
        })
    }

    handleUserchoice = async () => {
        const token = await AsyncStorage.getItem('userToken');
        let bin = "";

        this.setState({
            isLoading: true
        });

        if (this.state.category === "Paper") {
            bin = "blue";
        } else if (this.state.category === "Glass") {
            bin = "brown";
        } else if (this.state.category === "Aluminium") {
            bin = "orange";
        }

        alert(`Please submit your trash into the ${bin} bin.`);

        axios.post('http://157.245.205.223:8000/recycle', {
            recyclable: this.state.category
        }, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {     
            console.log(response.data)
            this.setState({
                isLoading: false
            });

            if (response.data.status === 'submitted') {
                alert('Successfully submitted trash.\nPoints updated.');
                this.props.navigation.navigate("Profile");
            }
        })
        .catch(error => {
            console.log(error);
            if (error.response) {
                if (error.response.status === 400) {
                    this.setState({
                        errorMessage: "You have not submitted the thrash."
                    });
                }
            }
        });
    }

    validateUserchoice = () => {
        if (this.state.category == 0) {
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

                {this.state.isLoading 
                    && <ActivityIndicator size="large" style={styles.loading} />
                }

                <View style={styles.errorMessage}>
                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                </View>

                {this.state.upload && 
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.category}
                        onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
                    >
                        <Picker.Item label="Options" value='0' />
                        <Picker.Item label="Paper" value="Paper" />
                        <Picker.Item label="Glass" value="Glass" />
                        <Picker.Item label="Aluminium & Plastic" value="Aluminium" />
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
        height: 300,
        top: -50,
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
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        marginBottom: -10
    },
    picker: {
        height: 100, 
        width: 180, 
        top: -100,
    }
});