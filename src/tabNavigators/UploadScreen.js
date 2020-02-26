import React from 'react';
import { CameraRoll, TouchableOpacity, View } from 'react-native';
import { Icon, ThemeProvider } from 'react-native-elements';
import PropTypes from 'prop-types';

class UploadScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#000',
            marginLeft: 15,
            marginRight: 15,
            borderBottomWidth: 0
        },
        headerLeft: (
            <TouchableOpacity>
                <Icon name="close" color="#fff" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        ),
        headerRight: !navigation.getParam('uploadProgress', 0) && (
            <TouchableOpacity>
                <Icon name="done" color="#fff" onPress={() => navigation.getParam('upload')} />
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
        this.state = ({
            photos: null,
            selectedPhoto: null
        });
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 100 });
    }


}