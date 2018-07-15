import React, { Component } from 'react';
import ReactNative from 'react-native';
import { TrumpButton } from './common/TrumpButton';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux'

const Realm = require('realm')

const {
    View,
    Image,
    StyleSheet,
    Text
} = ReactNative;

const splashScreen = require('../images/signup.png')


class Splash extends React.Component {

    constructor(props) {
        super(props);          
    }  

    componentDidMount() {
        this.props.welcome()
        class Dog {}
        Dog.schema = {
            name: 'DogWalker',
            properties: {
                name: 'string',
                age: {type: 'int', default: 0}
            }
        }
        let realm = new Realm({
            schema: [Dog]
        })
        
        realm.write(()=>{
            let pData = realm.objects('DogWalker')
            realm.delete(pData)
            realm.create('DogWalker', {name: 'Rex', age: 17}),
            realm.create('DogWalker', {name: 'Mickey', age: 18}),
            realm.create('DogWalker', {name: 'Baobu', age: 19}),
            realm.create('DogWalker', {name: 'Secondary', age: 20})
        })
        let query = realm.objects('DogWalker').filtered('name CONTAINS "y"')
        alert(JSON.stringify(query))
    }

    render() {
        const rightButtonConfig = {
            title: 'Sign Up | Sign In',
            tintColor: 'blue',
            style: {
            },
            handler: function () {
              Actions.auth()
            },
        };
        return (
            <Image source={splashScreen} style={styles.container}>
              <NavigationBar
                  style = {{backgroundColor: '#eeeef1', height: 50}}
                  rightButton = {rightButtonConfig}
              />
              <View style={{flex: 1, backgroundColor: 'transparent',justifyContent: 'center', alignItems: 'center'}}>
                <TrumpButton />
              </View>
            </Image>
        );
    }
}


const styles = {
  container: {
    flex: 1,
    width: null,
    height: null
  }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        Greeting: state.Greeting
    }
}, mapDispatchToProps)(Splash);
