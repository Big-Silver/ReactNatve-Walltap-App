import React from 'react';
import ReactNative from 'react-native';
const {
    Alert,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} = ReactNative;
import {Actions} from 'react-native-router-flux'

const alertMessage = '---> login screen'
const trumpIcon = require('../../images/trump.png')
class TrumpButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => Actions.auth()} style={styles.buttonStyle}>
                <Image source={trumpIcon} style={styles.trumpHead} />
                <Text style={styles.clickMe}>
                  Click Me To Sign Up | Sign In
                </Text>
                <Text style={styles.clickMe}>
                  Haz Clic Aqui Para Registrarte | Acceder
                </Text>
            </TouchableOpacity>
          </View>
        );
    }
}
    

const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    trumpHead: {
      width: 125,
      height: 125,
      resizeMode: 'stretch'
    },

    clickMe: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    }
});

export { TrumpButton };
