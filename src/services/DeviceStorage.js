import { AsyncStorage } from 'react-native';

const DeviceStorage = {
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    },

    
};

export default DeviceStorage;