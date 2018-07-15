import React, {Component} from 'react'
import {Router, Scene} from 'react-native-router-flux'
import {Provider, connect} from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import Splash from './components/Splash'
import Auth from './components/LoginForm'
import MainPage from './components/MainPage'
import PurchasePage from './components/PurchasePage'


const RouterWithRedux = connect()(Router)
const {
  AppRegistry
} = require('react-native')
// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class WallTap extends Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='splash' component={Splash} title='splash screen'  hideNavBar={true}/>
          <Scene key='auth' component={Auth} title='auth page'  hideNavBar={true}/>
          <Scene key='main' component={MainPage} title='main page'  hideNavBar={true}/>
          <Scene key='purchase' component={PurchasePage} title='purchage page'  hideNavBar={true}/>
        </RouterWithRedux>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('WallTap', () => WallTap);