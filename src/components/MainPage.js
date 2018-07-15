// import _ from 'lodash'; //
import React, { Component } from 'react';
import ReactNative from 'react-native';
import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux'
import * as firebase from "firebase";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {
AdMobBanner, 
AdMobInterstitial, 
PublisherBanner,
AdMobRewarded
} from 'react-native-admob'
const {
	View,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity
} = ReactNative;

const background = require('../images/main.png')
const plusButton = require('../images/plus.png')
const minusButton = require('../images/minus.png')

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		wallHeight: 0,
		totalVotes: 0,
		voteAdd: 0,
		voteSub: 0,
		voteMult: 1,
		user: null
		};
		this.onAdd = this.onAdd.bind(this);
		this.onSubtract = this.onSubtract.bind(this);
	}

	componentDidMount() {
		const _this = this
		this.loadInterval = true;
		let votesPath = "/userVotes/";
		firebase.database().ref(votesPath).on('value', (snapshot) => {
			let wallHeight = 0
			let totalVotes = 0
			let Data = {};
			if (snapshot.val()) {
				Data = snapshot.val();
				Object.keys(Data).map(function (key) {  
					wallHeight += (Data[key]['VoteUp'] - Data[key]['VoteDown'])
					totalVotes += Data[key]['Plus'] + Data[key]['Minus']
				});
				_this.loadInterval && _this.setState({wallHeight: wallHeight, totalVotes: totalVotes})
			}
		});
	}

	componentWillUnmount () {
		this.loadInterval = false;
	}

	onAdd() {
		this.setState(prevState => {
		return { wallHeight: prevState.wallHeight += 1, voteAdd: prevState.voteAdd + 1 };
		});
	}
	onSubtract() {
		this.setState(prevState => {
		return { wallHeight: prevState.wallHeight -= 1, voteSub: prevState.voteSub -1 };
		});
	}

	render() {
		const leftButtonConfig = {
			title: 'Logout',
			tintColor: 'blue',
			handler: function () {
			Actions.pop({refresh: {logout: true}})
			},
		};
		const rightButtonConfig = {
			title: 'Shop',
			tintColor: 'blue',
			style: {
			},
			handler: function () {
			Actions.purchase()
			},
		};
		return (
		<Image source={background} style={styles.backgroundImage}>
			<NavigationBar
				style = {{backgroundColor: '#eeeef1', height: 50}}
				leftButton = {leftButtonConfig}
				rightButton = {rightButtonConfig}
			/>
			<View style={{paddingLeft: 15}}>
			<View>
				<Text style={[styles.text, {marginTop: 15}]}>Wall Height:</Text>
			</View>
			<View>
				<Text style={[styles.valueText, {color: 'red'}]}>{this.numberWithCommas(this.state.wallHeight)} ft.</Text>
			</View>
			<View>
				<Text style={[styles.text, {marginTop: 15}]}>Total Votes:</Text>
			</View>
			<View>
				<Text style={[styles.valueText, {color: 'green'}]}>{this.numberWithCommas(this.state.totalVotes)}</Text>
			</View>
			</View>
			<View style={styles.stateView}>
			<View style={{flex: 0.5}}>
				<View>
					<Text style={styles.text}>Your Votes:</Text>
				</View>
				<View>
					<Text style={[styles.valueText, {color: 'blue'}]}>{this.numberWithCommas(this.props.VOTEUP)} ft.</Text>
				</View>
				<View>
					<Text style={[styles.valueText, {color: 'blue'}]}>-{this.numberWithCommas(this.props.VOTEDOWN)} ft.</Text>
				</View>
				<View>
					<Text style={styles.text}>Your Multiplier:</Text>
				</View>
				<View>
					<Text style={[styles.valueText, {color: 'yellow'}]}>{this.numberWithCommas(this.props.MULTIPLIER)}</Text>
				</View>
			</View>
			</View>
			<View style={styles.buttonView}>
			<View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
				<TouchableOpacity onPress={() => {this.props.onAddVote(this.props.UID, this.props.EMAIL, this.props.MULTIPLIER, this.props.VOTEUP, this.props.VOTEDOWN, this.props.PLUS, this.props.MINUS)}}>
				<Image source={plusButton} style={styles.button}/>
				</TouchableOpacity>
			</View>
			<View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
				<TouchableOpacity onPress={() => {this.props.onSubVote(this.props.UID, this.props.EMAIL, this.props.MULTIPLIER, this.props.VOTEUP, this.props.VOTEDOWN, this.props.PLUS, this.props.MINUS)}}>
				<Image source={minusButton} style={styles.button}/>
				</TouchableOpacity>
			</View>
			</View>
			<View style={styles.bannerView}>
			<AdMobBanner
				bannerSize="smartBannerPortrait"
				adUnitID="ca-app-pub-8429393674950200/7506664371"
				testDeviceID="EMULATOR"
				didFailToReceiveAdWithError={this.bannerError} />
			</View>

		</Image>
		);
	}

	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

}

const styles = {
backgroundImage: {
	resizeMode: 'stretch',
	flex: 1,
	width: null,
	height: null
},

text: {
	backgroundColor: 'transparent',
	color: 'black',
	fontSize: 16,
	padding: 5,
	fontWeight: 'bold'
},

valueText: {
	backgroundColor: 'transparent',
	fontSize: 14,
	padding: 5,
	fontWeight: 'bold',
	marginLeft: 10
},

stateView: {
	position: 'absolute',
	bottom: 150,
	left: 0,
	right: 0,
	height: 150,
	flex: 1,
	flexDirection: 'row',
	padding: 10
},

buttonView: {
	position: 'absolute',
	bottom: 50,
	left: 0,
	right: 0,
	height: 100,
	flex: 1,
	flexDirection: 'row',
	padding: 10
},

bannerView: {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	height: 50,
	justifyContent: 'flex-end'
},

button: {
	width: 80,
	height: 80,
	resizeMode: 'stretch'
},

coinImage: {
	width: 30,
	height: 30,
	resizeMode: 'stretch'
}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
	return {
		UID: state.UID,
		EMAIL: state.Email,
		MULTIPLIER: state.MULTIPLIER,
		VOTEUP: state.VOTEUP,
		VOTEDOWN: state.VOTEDOWN,
		PLUS: state.PLUS,
		MINUS: state.MINUS
	}
}, mapDispatchToProps)(MainPage);
