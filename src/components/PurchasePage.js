import React, { Component } from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import { NativeModules } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

import Share, {ShareSheet, Button} from 'react-native-share';
const { InAppUtils } = NativeModules
const InAppBilling = require("react-native-billing");
const {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform
} = ReactNative;
var width = Dimensions.get('window').width
const background = require('../images/store.png')

class PurchasePage extends Component {
  
  render() {
    const leftButtonConfig = {
        title: ' < ',
        tintColor: 'blue',
        style: {
        },
        handler: function () {
          Actions.pop()
        },
    };
    const titleConfig = {
        title: 'Almacenar',
        tintColor: 'black',
        style: {
            fontSize: 18,
        }
    };
    
    return (
      <Image source={background} style={styles.backgroundImage}>
        <NavigationBar
            style = {{backgroundColor: '#eeeef1', height: 50}}
            title = {titleConfig}
            leftButton = {leftButtonConfig}
        />
        <View style={{flex: 0.2}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.voteView} onPress={() => {this.onPurchase(4)}}>
                <Text style={styles.voteText}>Votes x4</Text>
                <Text style={styles.priceText}>$0.99</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.voteView} onPress={() => {this.onPurchase(100)}}>
                <Text style={styles.voteText}>Votes x100</Text>
                <Text style={styles.priceText}>$24.99</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 0.2}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.voteView} onPress={() => {this.onPurchase(10)}}>
                <Text style={styles.voteText}>Votes x10</Text>
                <Text style={styles.priceText}>$4.99</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.voteView} onPress={() => {this.onPurchase(200)}}>
                <Text style={styles.voteText}>Votes x200</Text>
                <Text style={styles.priceText}>$39.99</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 0.2}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.voteView} onPress={() => {this.onPurchase(40)}}>
                <Text style={styles.voteText}>Votes x40</Text>
                <Text style={styles.priceText}>$9.99</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.voteView} onPress={() => {this.onPurchase(400)}}>
                <Text style={styles.voteText}>Votes x400</Text>
                <Text style={styles.priceText}>$49.99</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
          {this.showShareButtons()}
        </View>
      </Image>
    );
  }

  showShareButtons() {
    if(this.props.joinWith == 'email'){
      return(
        <View>
        <TouchableOpacity style={styles.twitterButton} onPress={() => {this.onShareButton('twitter')}}>
          <Text style={styles.loginButton}>Share via Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceBookButton} onPress={() => {this.onShareButton('facebook')}}>
          <Text style={styles.loginButton}>Share via Facebook</Text>
        </TouchableOpacity>
        </View>
      )
    }
    else if(this.props.joinWith == 'twitter'){
      return(
        <TouchableOpacity style={styles.twitterButton} onPress={() => {this.onShareButton('twitter')}}>
          <Text style={styles.loginButton}>Share via Twitter</Text>
        </TouchableOpacity>
      )
    }
    else if(this.props.joinWith == 'facebook'){
      return(
        <TouchableOpacity style={styles.faceBookButton} onPress={() => {this.onShareButton('facebook')}}>
          <Text style={styles.loginButton}>Share via Facebook</Text>
        </TouchableOpacity>
      )
    }
  }

  onShareButton(value) {
    let url, shareOptions
    if(value == 'facebook'){
      //share via Twitter
      url = 'https://www.facebook.com/walltapgame'
    }
    else{
      //share via Facebook
      url = 'https://twitter.com/Wall_Tap'
    }
    shareOptions = {
      title: "Wall Tap",
      message: "At the dawn of the 21st century, one man set out to build a Wall.  It's up to all of us to decide the height of this Wall.",
      url: url,
      subject: "Wall Tap" //  for email
    };
    Share.shareSingle(Object.assign(shareOptions, {
      "social": value
    }))
    .catch((err) => {
      console.log(err.toString())
    });
  }

  onPurchase(times){
        const _this = this
        if(Platform.OS === 'android'){
          InAppBilling.open()
          .then(() => {
              InAppBilling.purchase('votesx' + times)
              .then((details) => {
                InAppBilling.close()
                console.log(details)
                this.props.onChangeMultiplier(times, this.props.uid)
              })
              .catch((err) => {
                console.log('ERROR! ' + err.toString())
                InAppBilling.close()
              });
          })
          
        }else{
          var products = [
            'org.walltap.votesxx' + times,
          ];
          InAppUtils.loadProducts(products, (error, products) => {
            var productIdentifier = 'org.walltap.votesxx' + times;
            InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
              // NOTE for v3.0: User can cancel the payment which will be availble as error object here.
              if(error){
                console.log(error)
                alert('Purchasing error:' + error.toString())
              }
              else if(response && response.productIdentifier) {
                  console.log('Your Transaction ID is ' + response.transactionIdentifier);
                  let data = {
                    UserID: _this.props.uid,
                    Email: _this.props.EMAIL,
                    Multipliers: _this.props.MULTIPLIER + times,
                    VoteUp: _this.props.VOTEUP,
                    VoteDown: _this.props.VOTEDOWN,
                    Plus: _this.props.PLUS,
                    Minus: _this.props.MINUS,
                  }
                  _this.props.onChangeMultiplier(data)
                  console.log("Your UserId is " + _this.props.uid)
                  //unlock store here.
              }
            });
          })
        }  
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },

  voteView: {
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: width / 2 - 20,
    backgroundColor: '#afc3dd'
  },
  voteText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  priceText: {
    color: 'black',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  twitterButton: {
    width: 250,
    backgroundColor: '#0083b3', 
    height: 45, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 15
  },

  loginButton: {
    textAlign: 'center', 
    color: 'white', 
    width: 250,
    fontSize: 18,
    fontWeight: 'bold'
  },

  faceBookButton: {
    width: 250,
    backgroundColor: '#3763a2', 
    height: 45, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 15
  },

};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        joinWith: state.joinWith,
        uid: state.UID,
        EMAIL: state.Email,
        MULTIPLIER: state.MULTIPLIER,
        VOTEUP: state.VOTEUP,
        VOTEDOWN: state.VOTEDOWN,
        PLUS: state.PLUS,
        MINUS: state.MINUS
    }
}, mapDispatchToProps)(PurchasePage);
