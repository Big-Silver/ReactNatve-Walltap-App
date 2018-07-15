import React, { Component } from 'react';
import ReactNative from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {Actions} from 'react-native-router-flux'
import Button from 'apsl-react-native-button';
import Spinner from 'react-native-loading-spinner-overlay'
import Firestack from 'react-native-firestack'
import Storage from 'react-native-storage';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
const firestack = new Firestack();
var {
  NativeModules
  } = ReactNative;
const { TwitterSignin } = NativeModules;
const Realm = require('realm')
const {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} = ReactNative;
var storage = new Storage({
    // maximum capacity, default 1000  
    size: 1000,
 
    // Use AsyncStorage for RN, or window.localStorage for web. 
    // If not set, data would be lost after reload. 
    storageBackend: AsyncStorage,
    
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds). 
    // can be null, which means never expire. 
    defaultExpires: 1000 * 3600 * 24,
    
    // cache data in the memory. default is true. 
    enableCache: true,
    
    // if data was not found in storage or expired, 
    // the corresponding sync method will be invoked and return  
    // the latest data. 
    sync : {
        // we'll talk about the details later. 
    }
})	
const background = require('../images/main.png')

class LoginForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        Email: 'Reactnativefun2017@hotmail.com',
        Password: 'Mickey2015'
      }    
  }

  componentDidMount() {
    storage.load({
        key: 'currentUser',
    }).then(ret => {
        this.setState({Email: ret.email, Password: ''});
        console.log(ret.userid);
    }).catch(err => {
        this.setState({Email: '', Password: ''});
    });
    let realm = new Realm({
        schema: [{name: 'DogWalker', properties: {name: 'string', age:{type:'int', default: 0}}}]
    })
    let query = realm.objects('DogWalker').filtered('name CONTAINS "y"')
    alert(JSON.stringify(query))
  }
  
  componentWillReceiveProps(props){
    if(props.logout){
      FBLoginManager.logout(() => {console.log('logged out')})
    }
  }

  render() {
    const _this = this
    const leftButtonConfig = {
        title: '<',
        tintColor: 'blue',
        handler: function () {
          Actions.pop()
        },
    };
    const titleConfig = {
        title: 'Sign Up | Sign In',
        tintColor: 'black',
        style: {
            fontSize: 20,
        }
    };
    return (
      <Image source={background} style={styles.backgroundImage}>
        <NavigationBar
            style = {{backgroundColor: '#eeeef1', height: 50}}
            title = {titleConfig}
            leftButton = {leftButtonConfig}
        />
        <Spinner visible={this.props.isLoading}/>
        <View style={styles.emailSection}>
          <View style={styles.sectionRow}>
            <View style={{flex: 0.3, justifyContent: 'center'}}>
              <Text style={styles.labelText}>Email</Text>
            </View>
            <View style={{flex: 0.7, borderBottomWidth: 1, borderColor: 'gray'}}>
              <TextInput
                  style = {{flex: 1, padding: 0}}
                  placeholder = "email@email.com"
                  placeholderTextColor = "gray"
                  underlineColorAndroid='transparent'
                  keyboardType = 'email-address'
                  onChangeText = {(text) => this.setState({ Email: text.replace(/ /g, "") })}
                  value = {this.state.Email}
              />
            </View>      
          </View>
          <View style={styles.sectionRow}>
            <View style={{flex: 0.3, justifyContent: 'center'}}>
              <Text style={styles.labelText}>Password</Text>
            </View>
            <View style={{flex: 0.7, borderBottomWidth: 1, borderColor: 'gray'}}>
              <TextInput
                  style = {{flex: 1, padding: 0}}
                  placeholder = "password"
                  maxLength={12}
                  secureTextEntry = {true}
                  placeholderTextColor = "gray"
                  underlineColorAndroid='transparent'
                  onChangeText = {(text) => this.setState({ Password: text.replace(/ /g, "") })}
                  value = {this.state.Password}
              />
            </View>
          </View>
          <View style={styles.sectionRow}>
            
            <TouchableOpacity 
                style = {styles.loginButtonView}
                onPress={() => {this.onSubmitEmailPassword()}}>
                <Text style={styles.loginButton}>Create | Login</Text>
            </TouchableOpacity>
          </View>    
        </View>
        <View style={styles.socialSection}>
          <View style={styles.sectionRow}>
            <FBLogin style={{ position: 'absolute', top: 1200 }}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              permissions={["email","user_friends"]}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              onLogin={function(data){
                console.log("Logged in!");
                console.log(data);
              }}
              onLogout={function(){
                console.log("Logged out.");
                _this.setState({ user : null });
              }}
              onLoginFound={function(data){
                console.log("Existing login found.");
                console.log("Login data: ", data);
                _this.props.setLoading(true)
                _this.checkFacebookUser(data.credentials)
                _this.props.setJoinWith('facebook')
              }}
              onLoginNotFound={function(){
                console.log("No user logged in.");
                _this.setState({ user : null });
              }}
              onError={function(data){
                console.log("ERROR");
                console.log(data);
              }}
              onCancel={function(){
                console.log("User cancelled.");
              }}
              onPermissionsMissing={function(data){
                console.log("Check permissions!");
                console.log(data);
              }}
            />
            <TouchableOpacity style={styles.faceBookButton} onPress={() => {
              FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
              FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
                if (!error) {
                  console.log("Login data: ", data);
                  _this.props.setLoading(true)
                  _this.checkFacebookUser(data.credentials)
                  _this.props.setJoinWith('facebook')
                } else {
                  console.log("Error: ", error);
                }
              })
            }}>
              <Text style={styles.loginButton}>Log In with Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionRow}>
            <TouchableOpacity style={styles.twitterButton} onPress={() => {
                
              TwitterSignin.logIn('kEr1wB0v2415xIRXrSO0jdz62', 'G8N9c6snF9omLebBTLxsPfU0fXsv7XTAkmsEgvnbEkZ2Kh8Tzx', (error, loginData) => {
                if (!error) {
                  console.log('USERINFO', loginData)
                  _this.props.onAnthwithEmail(loginData.userID + '@twitter.com', loginData.userID, _this)
                  _this.props.setJoinWith('twitter')
                } else {
                  console.log(error)
                }
              });
            }}>
              <Text style={styles.loginButton}>Log In with Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.errorView}>
          <Text style={{textAlign: 'center', backgroundColor: 'transparent', color: 'red'}}>{this.state.error}</Text>
        </View>
      </Image>

    );
  }

  onSubmitEmailPassword() {
    if(this.state.Password.length < 6){
      alert('Password must be over 6 in length.')
    }
    else{
      this.props.onAnthwithEmail(this.state.Email, this.state.Password, this)
      this.props.setJoinWith('email')
      storage.save({
          key: 'currentUser',   // Note: Do not use underscore("_") in key! 
          rawData: {
              email: this.state.Email,
          },
          expires: null
      }); 
    }            
  }

  checkFacebookUser(credentials) {
    const _this = this
    firestack.auth.signInWithProvider('facebook', credentials.token, '') // facebook need only access token.
    .then((user)=>{
        console.log(user)
        _this.props.loginUserSuccess(user.user)
    })
    .catch((err) => {
        alert(JSON.stringify(err))
        _this.props.setLoading(false)
    })
  }

  // checkTwitterUser(credentials) {
  //   const _this = this
  //   firestack.auth.signInWithProvider('twitter', credentials.authToken, 'seUmtzbzLDOnwGecKlbEGfC4B') // facebook need only access token.
  //   .then((user)=>{
  //       console.log(user)
  //       _this.props.loginUserSuccess(user.user)
  //   })
  //   .catch((err) =>{
  //     console.log('ERROR', err)
  //   })
  // }
}

const styles = {
  emailSection: {
    backgroundColor: '#F0FFFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    margin: 10,
    padding: 10,
    height: 200
  },

  socialSection: {
    backgroundColor: '#F0FFFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    margin: 10,
    padding: 10,
    height: 140
  },
  
  sectionRow: {
    height: 60, 
    padding: 15, 
    flexDirection: 'row'
  },

  labelText: {
    fontSize: 16
  },

  loginButtonView: {
    flex: 1, 
    backgroundColor: '#31cc31', 
    height: 35, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 0
  },

  faceBookButton: {
    flex: 1, 
    backgroundColor: '#3763a2', 
    height: 35, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  twitterButton: {
    flex: 1, 
    backgroundColor: '#0083b3', 
    height: 35, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  loginButton: {
    textAlign: 'center', 
    color: 'white', 
    width: 150,
    fontWeight: 'bold'
  },

  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  facebook: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3864a3',
    borderRadius: 30,
    borderWidth: 2,
    width: 30,
    borderColor: 'white',
    marginLeft: 5,
    paddingBottom: 10,
    marginRight: 5
  },
  twitter: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#0084b4',
    borderRadius: 30,
    borderWidth: 2,
    width: 30,
    borderColor: 'white',
    marginLeft: 5,
    paddingBottom: 10,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        Greeting: state.Greeting,
        isLoading: state.isLoading
    }
}, mapDispatchToProps)(LoginForm);
