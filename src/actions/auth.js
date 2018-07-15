import * as types from './types'
import * as firebase from "firebase";
import {Actions} from 'react-native-router-flux'
import Firestack from 'react-native-firestack'
const firestack = new Firestack();
firebase.initializeApp({
    apiKey: "AIzaSyDV9ha8vPlNraqOVTWhs9uNFxdC5l4r-YM",
    authDomain: "walltap-f8489.firebaseapp.com",
    databaseURL: "https://walltap-f8489.firebaseio.com",
    projectId: "walltap-f8489",
    storageBucket: "walltap-f8489.appspot.com",
    messagingSenderId: "331388725629"
});

export const welcome = () => {
    return {
        type: types.WELCOME,
        msg: 'Welcome to start this app!'
    };
}

export const setLoading = (state) => {
    return {
        type: types.ISLOADING,
        data: state
    }
}

export const setEmail = (email) => {
    return{
        type: types.SHOW_VAILD_EMAIL,
        data: email
    }
}

export const setPassword = (pass) => {
    return{
        type: types.SHOW_VAILD_PASSWORD,
        data: pass
    }
}

export const onAnthwithEmail = (email, password, handle) => {
    return (dispatch, getState) => {
        handle.setState({error: ''})  
        dispatch(setLoading(true))
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(setEmail(email))
            dispatch(setPassword(password))
            dispatch(loginUserSuccess(user))
        })
        .catch((err) => {
            console.log('SIGNUP ERROR', err.toString())
            dispatch(setLoading(false))
            firebase.auth().signOut()
            if(err.toString().indexOf('The password is invalid') > -1 || err.toString().indexOf('Try again later') > -1){
                handle.setState({error: 'Password is incorrect!'})         
            }
            else{
                dispatch(SignUpUser(email, password))
            }
            
        });
    };
};

export const onAuthFacebook = (data) => {
    let token = data.token
    firestack.auth.signInWithProvider('facebook', token, '') // facebook need only access token.
    .then((user)=>{
        console.log(user)
        alert(JSON.stringify(user))
    })
}

export const SignUpUser = (email, pass) => {
    return (dispatch, getState) => {
        
        firestack.auth.createUserWithEmail(email, pass)
        .then(user => {
            dispatch(setEmail(email))
            dispatch(setPassword(pass))
            dispatch(SignUpUserSuccess(user, email))
        })
        .catch((err) => {
            dispatch(SignUpFail(JSON.stringify(err)))            
        });
    };
    
}

export const loginUserFail = (err) => {
    return (dispatch, getState) => {
        alert('Login failed!' + err)
    }
};

export const SignUpFail = (err) => {
    return (dispatch, getState) => {
        alert('SignUp failed!' + err)
    }
}

export const SignUpUserSuccess = (user, email) => {
    return (dispatch, getState) => {
        dispatch(SignUpSuccess(user))    
        let usersPath = "/userVotes/" + user.uid;
        let Data = {
            UserID: user.uid,
            Email: email,
            Multipliers: 1,
            VoteUp: 0, 
            VoteDown: 0,
            Plus: 0,
            Minus: 0
        }
        firebase.database().ref(usersPath).set(Data)
        dispatch(getUserInfo(Data))
        dispatch(setLoading(false))
        Actions.main()
    }
}

export const loginUserSuccess = (user) => {
    return (dispatch, getState) => {
        dispatch(LoginSuccess(user))    
        let usersPath = "/userVotes/" + user.uid;
        firebase.database().ref(usersPath).on('value', (snapshot) => {
            var Data = {};
            if (snapshot.val()) {
                Data = snapshot.val();
                dispatch(getUserInfo(Data))
                dispatch(setLoading(false))
                Actions.main()
            }
            else{
                dispatch(SignUpUserSuccess(user, user.email))
            }
        });
        
    };
};

export const LoginSuccess = (user) => {
    return{
        type: types.LOGIN_USER_SUCCESS,
        data: user
    }
}

export const SignUpSuccess = (user) => {
    return {
        type: types.SIGNUP_USER_SUCCESS,
        data: user
    }
}

export const onAddVote = (uid, email, multipliers, voteup, votedown, plus, minus) => {
    return (dispatch, getState) => {
        let usersPath = "/userVotes/" + uid
        let data = {
            UserID: uid,
            Email: email,
            Multipliers: multipliers,
            VoteUp: voteup + multipliers, 
            VoteDown: votedown,
            Plus: plus + 1,
            Minus: minus
        }
        firebase.database().ref(usersPath).set(data)
        dispatch(getUserInfo(data))
    }
}

export const onSubVote = (uid, email, multipliers, voteup, votedown, plus, minus) => {
    return (dispatch, getState) => {
        let usersPath = "/userVotes/" + uid
        let data = {
            UserID: uid,
            Email: email,
            Multipliers: multipliers,
            VoteUp: voteup, 
            VoteDown: votedown + multipliers,
            Plus: plus,
            Minus: minus + 1
        }
        firebase.database().ref(usersPath).set(data)
        dispatch(getUserInfo(data))
    }
}

export const getUserInfo = (data) => {
    return {
        type: types.USER_INFO,
        data: data
    }
}

export const setJoinWith = (value) => {
    return {
        type: types.JOIN_WITH,
        data: value
    }
}

