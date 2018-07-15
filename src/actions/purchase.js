import * as types from './types'
import * as firebase from "firebase";
import {Actions} from 'react-native-router-flux'
import Firestack from 'react-native-firestack'
const firestack = new Firestack();

export const changeMultiplier = (data) => {
    return {
        type: types.USER_MULTIPLIER,
        data: data.Multipliers
    };
}

export const onChangeMultiplier = (data) => {
    return (dispatch, getState) => {
        let usersPath = "/userVotes/" + data.UserID;
        firebase.database().ref(usersPath).set(data)
        dispatch(changeMultiplier(data))
    };
}