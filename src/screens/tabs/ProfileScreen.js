import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Image, Modal } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AboutModal from '../../components/AboutModal';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            house: '',
            newAvatar: '',
            visible: false,
            BlueRecycled: '',
            BrownRecycled: '',
            OrangeRecycled: '',
            TotalRecycled: '',
            Avatar: '',
        };
        this.getData = this.getData.bind(this);
        this.signOut = this.signOut.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.modalVisible = this.modalVisible.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('userToken');
        axios.get('http://157.245.205.223:8000/student', {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {
            const data = response.data;
            this.setState({
                name: data.StudentName,
                email: data.Email,
                house: data.HouseID,
                BlueRecycled: data.BlueRecycled,
                BrownRecycled: data.BrownRecycled,
                OrangeRecycled: data.OrangeRecycled,
                TotalRecycled: data.TotalRecycled,
                Avatar: data.Avatar
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    signOut = async () => {
        await AsyncStorage.clear();
        alert("You have signed out!");
        this.props.navigation.navigate("Auth");
    };

    modalVisible = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    changeAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });
        
        if (!result.cancelled) {
            this.setState({ 
                Avatar: result.base64
            });
        }

        const token = await AsyncStorage.getItem('userToken');
        axios.post('http://157.245.205.223:8000/profile_pic', {
            Avatar: this.state.Avatar
        }, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => {
            alert("You've changed your profile picture.");
        })
        .catch(error => {
            console.log(error);
        })
    }

    capitaliseFirstLetter = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Modal 
                    animationType="slide" 
                    visible={this.state.visible} 
                    onRequestClose={() => this.modalVisible()}
                >
                    <AboutModal closeModal={() => this.modalVisible()} />
                </Modal>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleBar}>
                        <TouchableOpacity onPress={this.modalVisible}>
                            <Ionicons name="ios-information-circle" size={24} color="#52575D" />  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.signOut}>
                            <AntDesign name="logout" size={24} color="#52575D" />   
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <View style={styles.profilePic}>
                            <Image 
                                source={
                                    this.state.Avatar
                                        ? { uri: `data:image/jpg;base64,${this.state.Avatar}` } 
                                        : require('../../../assets/avatarPlaceholder.jpg')
                                    }
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>

                        <View style={styles.changePic}>
                            <TouchableOpacity onPress={this.changeAvatar}>
                                <Ionicons 
                                    name="ios-add" 
                                    size={16} 
                                    color="#DFD8C8" 
                                    style={{ marginTop: 1, marginLeft: 1 }} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>{this.state.name}</Text>
                        <Text style={[styles.text, { fontSize: 20 }]}>Email: {this.state.email}</Text>
                        <Text style={[styles.text, { fontSize: 18 }]}>House: {this.capitaliseFirstLetter(this.state.house)}</Text>
                        <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14, marginTop: 20 }]}>Student</Text>
                    </View>

                    <View style={styles.recycleStats}>
                        <View style={[styles.totalContainer, { backgroundColor: '#DAA520' }]}>
                            <Text style={styles.countItem}>{this.state.TotalRecycled}</Text>
                            <Text style={[styles.countSubtext]}>Total Items Recycled</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={[styles.categoryContainer, {backgroundColor: '#3F92D2' }]}>
                                <Text style={styles.categoryTitle}>Paper</Text>
                                <View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.countItem}>{this.state.BlueRecycled}</Text>
                                        <Text style={styles.countSubtext}>Items Recycled</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.categoryContainer, {backgroundColor: '#FF7400' }]}>
                                <Text style={styles.categoryTitle}>Aluminium & Cans</Text>
                                <View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.countItem}>{this.state.OrangeRecycled}</Text>
                                        <Text style={styles.countSubtext}>Items Recycled</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.categoryContainer, {backgroundColor: '#A0522D' }]}>
                                <Text style={styles.categoryTitle}>Glass</Text>
                                <View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.countItem}>{this.state.BrownRecycled}</Text>
                                        <Text style={styles.countSubtext}>Items Recycled</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 16
    },
    profilePic: {
        shadowColor: '#151734',
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    image: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    userInfo: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    text: {
        color: '#52575D',
    },
    subText: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    recycleStats: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 32
    },
    statsBox: {
        alignItems: 'center',
        flex: 1
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 18
    },
    categoryContainer: {
        paddingVertical: 28,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    totalContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 320
    },
    countItem: {
        fontSize: 48,
        fontWeight: '200',
        color: '#FFF'
    },
    countSubtext: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF'
    },
    changePic: {
        backgroundColor: '#414448',
        position: 'absolute',
        top: 95,
        bottom: 0,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});